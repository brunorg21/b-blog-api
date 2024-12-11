import { CommentLike } from "@/domain/blog/enterprise/entities/comment-like";
import { CommentLikeEntity } from "../schemas/comment-likes";

export class ToTypeormCommentLikesMapper {
  static toCommentLikeEntity(comment: CommentLike): CommentLikeEntity {
    return {
      id: comment.id,
      commentId: comment.commentId,
      bloggerId: comment.bloggerId,
    };
  }

  static toDomain(commentLikeEntity: CommentLikeEntity): CommentLike {
    return CommentLike.create(
      {
        bloggerId: commentLikeEntity.bloggerId,
        commentId: commentLikeEntity.commentId,
        likedAt: commentLikeEntity.likedAt,
      },
      commentLikeEntity.id
    );
  }
}
