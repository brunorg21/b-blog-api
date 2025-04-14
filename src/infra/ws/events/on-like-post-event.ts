import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { PostRepository } from "@/domain/blog/app/repositories/post-repostitory";

import { NotificationRepository } from "@/domain/notification/app/repositories/notification-repository";
import { OnLikePostSubscriber } from "@/domain/notification/app/subscribers/on-like-post";

import { SendNotificationUseCase } from "@/domain/notification/app/use-cases/send-notification";
import { Socket } from "socket.io";
import { userSocketMap } from "../web-socket";
import { NotificationPresenter } from "../presenters/notification-presenter";

export interface LikePostNotification {
  postId: string;
  likePostAuthorId: string;
  authorSocketId: string;
}

export class OnLikePostEvent {
  postRepository: PostRepository;
  bloggerRepository: BloggerRepository;
  sendNotificationUseCase: SendNotificationUseCase;
  subscriber: OnLikePostSubscriber;

  constructor(
    private socket: Socket,
    postRepository: PostRepository,
    bloggerRepository: BloggerRepository,
    notificationRepository: NotificationRepository
  ) {
    this.postRepository = postRepository;
    this.bloggerRepository = bloggerRepository;
    this.sendNotificationUseCase = new SendNotificationUseCase(
      notificationRepository
    );

    this.subscriber = new OnLikePostSubscriber(
      this.postRepository,
      this.bloggerRepository,
      this.sendNotificationUseCase
    );
  }

  async dispatch({
    postId,
    likePostAuthorId,
    authorSocketId,
  }: LikePostNotification) {
    const { notification } = await this.subscriber.execute({
      postId,
      likeAuthorId: likePostAuthorId,
    });

    authorSocketId = userSocketMap.get(notification?.recipientId);

    this.socket
      .to(authorSocketId)
      .emit(
        `like-post-${notification?.recipientId}`,
        NotificationPresenter.toWS(notification!)
      );
  }
}
