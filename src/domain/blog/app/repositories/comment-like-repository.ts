import { CommentLike } from "../../enterprise/entities/comment-like";

export interface CommentLikeRepository {
  save(commentLike: CommentLike): Promise<void>;
  update(commentLike: CommentLike): Promise<void>;
  delete(commentLike: CommentLike): Promise<void>;
  getByCommentId(commentId: string): Promise<CommentLike[]>;
  getByBloggerId(
    bloggerId: string,
    commentId: string
  ): Promise<CommentLike | null>;
}
