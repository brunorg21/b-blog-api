import { createServer } from "http";
import { Server } from "socket.io";
import { TypeormBloggerRepository } from "../database/typeorm/repositories/typeorm-blogger-repository";
import { OnInviteBloggerToCommunitySubscriber } from "@/domain/notification/app/subscribers/on-invite-blogger-to-community";
import { TypeormBloggerCommunityRepository } from "../database/typeorm/repositories/typeorm-bloggers-community-repository";
import { SendNotificationUseCase } from "@/domain/notification/app/use-cases/send-notification";
import { TypeormNotificationRepository } from "../database/typeorm/repositories/typeorm-notification-repository";
import { OnInviteToBloggerCommunityEvent } from "./events/on-invite-to-blogger-community-event";

export const wsApp = createServer();

const io = new Server(wsApp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("new user connected", socket.id);

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
