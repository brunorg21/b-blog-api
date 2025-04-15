import { createServer } from "node:http";
import { Server } from "socket.io";
import { TypeormBloggerRepository } from "../database/typeorm/repositories/typeorm-blogger-repository";
import { TypeormBloggerCommunityRepository } from "../database/typeorm/repositories/typeorm-bloggers-community-repository";
import { TypeormNotificationRepository } from "../database/typeorm/repositories/typeorm-notification-repository";
import { OnInviteToBloggerCommunityEvent } from "./events/on-invite-to-blogger-community-event";
import { RedisClient } from "../cache/redis/redis-client";
import { RedisRepository } from "../cache/redis/redis-repository";
import {
  LikePostNotification,
  OnLikePostEvent,
} from "./events/on-like-post-event";
import { TypeormPostRepository } from "../database/typeorm/repositories/typeorm-post-repository";

export const wsApp = createServer();

const io = new Server(wsApp, {
  cors: {
    origin: "*",
  },
});

export const userSocketMap = new Map();

io.on("connection", (socket) => {
  const redis = RedisClient.getInstance();

  const redisRepository = new RedisRepository(redis);

  const inviteBloggerEvent = new OnInviteToBloggerCommunityEvent(
    socket,
    new TypeormBloggerCommunityRepository(redisRepository),
    new TypeormBloggerRepository(),
    new TypeormNotificationRepository()
  );

  const likePostEvent = new OnLikePostEvent(
    socket,
    new TypeormPostRepository(),
    new TypeormBloggerRepository(),
    new TypeormNotificationRepository()
  );

  socket.on("register-blogger", (authorId) => {
    console.log(`Registrando usuário ${authorId} com socket ${socket.id}`);
    userSocketMap.set(authorId, socket.id);
  });

  socket.on("send", async (data) => {
    inviteBloggerEvent.dispatch(data);
  });

  socket.on("new-like-post", async (data: LikePostNotification) => {
    likePostEvent.dispatch(data);
  });
});

io.on("disconnect", (socket) => {
  console.log("user disconnected", socket.id);
});
