import { createServer } from "node:http";
import { Server } from "socket.io";
import { TypeormBloggerRepository } from "../database/typeorm/repositories/typeorm-blogger-repository";
import { TypeormBloggerCommunityRepository } from "../database/typeorm/repositories/typeorm-bloggers-community-repository";
import { TypeormNotificationRepository } from "../database/typeorm/repositories/typeorm-notification-repository";
import { OnInviteToBloggerCommunityEvent } from "./events/on-invite-to-blogger-community-event";
import { RedisClient } from "../cache/redis/redis-client";
import { RedisRepository } from "../cache/redis/redis-repository";

export const wsApp = createServer();

const io = new Server(wsApp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const redis = RedisClient.getInstance();

  const redisRepository = new RedisRepository(redis);

  const event = new OnInviteToBloggerCommunityEvent(
    socket,
    new TypeormBloggerCommunityRepository(redisRepository),
    new TypeormBloggerRepository(),
    new TypeormNotificationRepository()
  );

  socket.on("send", async (data) => {
    event.dispatch(data);
  });
});

io.on("disconnect", (socket) => {
  console.log("user disconnected", socket.id);
});
