import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { PostCommentRepository } from "@/domain/blog/app/repositories/post-comment-repository";
import { NotificationRepository } from "@/domain/notification/app/repositories/notification-repository";
import { OnLikeCommentSubscriber } from "@/domain/notification/app/subscribers/on-like-comment";
import { SendNotificationUseCase } from "@/domain/notification/app/use-cases/send-notification";
import { Socket } from "socket.io";

interface LikeCommentNotification {
  commentId: string;
  likeCommentAuthorId: string;
}

export class OnLikeCommentEvent {
  postCommentRepository: PostCommentRepository;
  bloggerRepository: BloggerRepository;
  sendNotificationUseCase: SendNotificationUseCase;
  subscriber: OnLikeCommentSubscriber;

  constructor(
    private socket: Socket,
    postCommentRepository: PostCommentRepository,
    bloggerRepository: BloggerRepository,
    notificationRepository: NotificationRepository
  ) {
    this.postCommentRepository = postCommentRepository;
    this.bloggerRepository = bloggerRepository;
    this.sendNotificationUseCase = new SendNotificationUseCase(
      notificationRepository
    );

    this.subscriber = new OnLikeCommentSubscriber(
      this.postCommentRepository,
      this.bloggerRepository,
      this.sendNotificationUseCase
    );
  }

  async dispatch({ commentId, likeCommentAuthorId }: LikeCommentNotification) {
    const { notification } = await this.subscriber.execute({
      commentId,
      likeCommentAuthorId,
    });

    this.socket.emit(
      `like-comment-${notification?.recipientId}`,
      notification
    );
  }
}
