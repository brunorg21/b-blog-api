import { PostRepository } from "@/domain/blog/app/repositories/post-repostitory";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";

interface OnLikePostSubscriberRequest {
  postId: string;
  likeAuthorId: string;
}

export class OnLikePostSubscriber {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly bloggerRepository: BloggerRepository,
    private readonly sendNotification: SendNotificationUseCase
  ) {}

  async execute({ postId, likeAuthorId }: OnLikePostSubscriberRequest) {
    const post = await this.postRepository.getById(postId);

    const blogger = await this.bloggerRepository.getById(postId);

    if (post) {
      await this.sendNotification.execute({
        message: `${blogger?.name} liked your post.`,
        recipientId: post.authorId,
        senderId: likeAuthorId,
        readAt: null,
      });
    }
  }
}
