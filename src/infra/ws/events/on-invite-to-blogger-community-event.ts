import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { BloggersCommunityRepository } from "@/domain/blog/app/repositories/bloggers-community-repository";
import { NotificationRepository } from "@/domain/notification/app/repositories/notification-repository";
import { OnInviteBloggerToCommunitySubscriber } from "@/domain/notification/app/subscribers/on-invite-blogger-to-community";
import { SendNotificationUseCase } from "@/domain/notification/app/use-cases/send-notification";
import { Socket } from "socket.io";

interface NotificationInvited {
  recipientId: string;
  senderId: string;
  bloggerCommunityId: string;
}

export class OnInviteToBloggerCommunityEvent {
  bloggerCommunityRepository: BloggersCommunityRepository;
  bloggerRepository: BloggerRepository;
  sendNotificationUseCase: SendNotificationUseCase;
  subscriber: OnInviteBloggerToCommunitySubscriber;

  constructor(
    private socket: Socket,
    bloggerCommunityRepository: BloggersCommunityRepository,
    bloggerRepository: BloggerRepository,
    notificationRepository: NotificationRepository
  ) {
    this.bloggerCommunityRepository = bloggerCommunityRepository;
    this.bloggerRepository = bloggerRepository;
    this.sendNotificationUseCase = new SendNotificationUseCase(
      notificationRepository
    );

    this.subscriber = new OnInviteBloggerToCommunitySubscriber(
      this.bloggerCommunityRepository,
      this.bloggerRepository,
      this.sendNotificationUseCase
    );
  }

  async dispatch(data: NotificationInvited) {
    const { notification } = await this.subscriber.execute({
      recipientId: data.recipientId,
      senderId: data.senderId,
      bloggerCommunityId: data.bloggerCommunityId,
    });

    this.socket.emit(
      `invite-to-blogger-community-${data.recipientId}`,
      notification
    );
  }
}
