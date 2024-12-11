import { CommentLike } from "@/domain/blog/enterprise/entities/comment-like";
import { CommentLikeRepository } from "../../repositories/comment-like-repository";
import { PostCommentRepository } from "../../repositories/post-comment-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { BloggerAlreadyLikeCommentError } from "../@errors/blogger-already-like-comment-error";

interface LikePostCommentUseCaseRequest {
  commentId: string;
  bloggerId: string;
}

export class LikePostCommentUseCase {
  constructor(
    private readonly postCommentRepository: PostCommentRepository,
    private readonly commentLikeRepository: CommentLikeRepository
  ) {}
  async execute({
    bloggerId,
    commentId,
  }: LikePostCommentUseCaseRequest): Promise<void> {
    const postComment = await this.postCommentRepository.getById(commentId);

    if (!postComment) {
      throw new ResourceNotFoundError();
    }

    const alreadyLikeThisPostComment =
      await this.commentLikeRepository.getByBloggerId(bloggerId, commentId);

    if (alreadyLikeThisPostComment) {
      throw new BloggerAlreadyLikeCommentError();
    }

    postComment.likeCount += 1;

    await this.postCommentRepository.update(postComment);
    await this.commentLikeRepository.save(
      CommentLike.create({
        commentId,
        bloggerId,
      })
    );
  }
}
