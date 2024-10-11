import { PostRepository } from "@/domain/blog/app/repositories/post-repostitory";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { PostLikeRepository } from "@/domain/blog/app/repositories/post-like-repository";

interface OnLikePostSubscriberRequest {
  postId: string;
  likeAuthorId: string;
}

export class OnLikePostSubscriber {
  constructor(
    private readonly postLikeRepository: PostLikeRepository,
    private readonly bloggerRepository: BloggerRepository,
    private readonly sendNotification: SendNotificationUseCase
  ) {}

  async execute({ postId, likeAuthorId }: OnLikePostSubscriberRequest) {
    const post = await this.postLikeRepository.getByPostId(postId);

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
