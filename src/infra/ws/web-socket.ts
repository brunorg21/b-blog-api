import { createServer } from "http";
import { Server } from "socket.io";
import { TypeormBloggerRepository } from "../database/typeorm/repositories/typeorm-blogger-repository";
import { TypeormBloggerCommunityRepository } from "../database/typeorm/repositories/typeorm-bloggers-community-repository";
import { TypeormNotificationRepository } from "../database/typeorm/repositories/typeorm-notification-repository";
import { OnInviteToBloggerCommunityEvent } from "./events/on-invite-to-blogger-community-event";

export const wsApp = createServer();

const io = new Server(wsApp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const event = new OnInviteToBloggerCommunityEvent(
    socket,
    new TypeormBloggerCommunityRepository(),
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
