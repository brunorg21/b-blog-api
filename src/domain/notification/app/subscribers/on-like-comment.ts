import { PostCommentLikeRepository } from "@/domain/blog/app/repositories/post-comment-like-repository";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { ResourceNotFoundError } from "@/domain/blog/app/use-cases/@errors/resource-not-found-error";

interface OnLikeCommentSubscriberRequest {
  commentId: string;
  likeCommentAuthorId: string;
}

export class OnLikeCommentSubscriber {
  constructor(
    private readonly postCommentLikeRepository: PostCommentLikeRepository,
    private readonly bloggerRepository: BloggerRepository,
    private readonly sendNotification: SendNotificationUseCase
  ) {}

  async execute({
    commentId,
    likeCommentAuthorId,
  }: OnLikeCommentSubscriberRequest) {
    const postCommentLike = await this.postCommentLikeRepository.getById(
      commentId
    );

    const blogger = await this.bloggerRepository.getById(likeCommentAuthorId);

    if (!blogger) {
      throw new ResourceNotFoundError();
    }

    if (postCommentLike) {
      await this.sendNotification.execute({
        message: `${blogger?.name} liked your comment.`,
        recipientId: postCommentLike.authorId,
        senderId: likeCommentAuthorId,
        readAt: null,
      });
    }
  }
}
