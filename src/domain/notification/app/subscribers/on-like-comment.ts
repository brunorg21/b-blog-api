import { SendNotificationUseCase } from "../use-cases/send-notification";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { ResourceNotFoundError } from "@/domain/blog/app/use-cases/@errors/resource-not-found-error";
import { PostCommentRepository } from "@/domain/blog/app/repositories/post-comment-repository";
import { Notification } from "../../enterprise/notification";

interface OnLikeCommentSubscriberRequest {
  commentId: string;
  likeCommentAuthorId: string;
}

interface OnLikeCommentSubscriberResponse {
  notification: Notification | null;
}

export class OnLikeCommentSubscriber {
  constructor(
    private readonly postCommentRepository: PostCommentRepository,
    private readonly bloggerRepository: BloggerRepository,
    private readonly sendNotification: SendNotificationUseCase
  ) {}

  async execute({
    commentId,
    likeCommentAuthorId,
  }: OnLikeCommentSubscriberRequest): Promise<OnLikeCommentSubscriberResponse> {
    const postComment = await this.postCommentRepository.getById(commentId);

    const blogger = await this.bloggerRepository.getById(likeCommentAuthorId);

    if (!blogger) {
      throw new ResourceNotFoundError();
    }

    if (postComment) {
      const { notification } = await this.sendNotification.execute({
        message: `${blogger?.name} liked your comment.`,
        recipientId: postComment.authorId,
        senderId: likeCommentAuthorId,
        readAt: null,
      });

      return { notification };
    }

    return { notification: null };
  }
}
