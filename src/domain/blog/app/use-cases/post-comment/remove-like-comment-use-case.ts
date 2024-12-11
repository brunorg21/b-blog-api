
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { CommentLikeRepository } from "../../repositories/comment-like-repository";
import { PostCommentRepository } from "../../repositories/post-comment-repository";

interface RemoveLikeCommentUseCaseRequest {
  commentId: string;
  bloggerId: string;
}

export class RemoveLikeCommentUseCase {
  constructor(
    private readonly postCommentRepository: PostCommentRepository,
    private readonly commentLikeRepository: CommentLikeRepository
  ) {}
  async execute({
    bloggerId,
    commentId,
  }: RemoveLikeCommentUseCaseRequest): Promise<void> {
    const comment = await this.postCommentRepository.getById(commentId);

    if (!comment) {
      throw new ResourceNotFoundError();
    }

    const commentLike = await this.commentLikeRepository.getByBloggerId(
      bloggerId,
      commentId
    );

    if (!commentLike) {
      throw new ResourceNotFoundError();
    }

    await this.commentLikeRepository.delete(commentLike);

    comment.likeCount -= 1;

    await this.postCommentRepository.update(comment);
  }
}
