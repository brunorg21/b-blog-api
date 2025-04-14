import { PostRepository } from "@/domain/blog/app/repositories/post-repostitory";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { Notification } from "../../enterprise/notification";

interface OnLikePostSubscriberRequest {
  postId: string;
  likeAuthorId: string;
}

interface OnLikePostSubscriberResponse {
  notification: Notification | null;
}

export class OnLikePostSubscriber {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly bloggerRepository: BloggerRepository,
    private readonly sendNotification: SendNotificationUseCase
  ) {}

  async execute({
    postId,
    likeAuthorId,
  }: OnLikePostSubscriberRequest): Promise<OnLikePostSubscriberResponse> {
    const post = await this.postRepository.getById(postId);

    const blogger = await this.bloggerRepository.getById(likeAuthorId);

    if (post) {
      const { notification } = await this.sendNotification.execute({
        message: `${blogger?.name} curtiu sua postagem.`,
        recipientId: post.authorId,
        senderId: likeAuthorId,
        readAt: null,
      });

      return { notification };
    }

    return { notification: null };
  }
}
