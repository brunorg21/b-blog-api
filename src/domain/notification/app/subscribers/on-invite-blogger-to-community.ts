import { SendNotificationUseCase } from "../use-cases/send-notification";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { BloggersCommunityRepository } from "@/domain/blog/app/repositories/bloggers-community-repository";
import { ResourceNotFoundError } from "@/domain/blog/app/use-cases/@errors/resource-not-found-error";
import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { Notification } from "../../enterprise/notification";

interface OnInviteBloggerToCommunitySubscriberRequest {
  senderId: string;
  recipientId: string;
  bloggerCommunityId: string;
}
interface OnInviteBloggerToCommunitySubscriberResponse {
  notification: Notification;
}

export class OnInviteBloggerToCommunitySubscriber {
  constructor(
    private readonly bloggerCommunityRepository: BloggersCommunityRepository,
    private readonly bloggerRepository: BloggerRepository,
    private readonly sendNotification: SendNotificationUseCase
  ) {}

  async execute({
    recipientId,
    senderId,
    bloggerCommunityId,
  }: OnInviteBloggerToCommunitySubscriberRequest): Promise<OnInviteBloggerToCommunitySubscriberResponse> {
    const bloggerCommunity = await this.bloggerCommunityRepository.getById(
      bloggerCommunityId
    );

    const senderBlogger = await this.bloggerRepository.getById(senderId);

    if (!bloggerCommunity) {
      throw new ResourceNotFoundError();
    }

    const { notification } = await this.sendNotification.execute({
      message: `${senderBlogger?.name} send a invitation to join ${bloggerCommunity?.name}.`,
      recipientId,
      senderId,
      readAt: null,
    });

    return { notification };
  }
}
