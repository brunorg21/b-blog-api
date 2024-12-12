import { CommentDetails } from "@/domain/blog/enterprise/entities/value-objects/comment-details";

export class CommentDetailsPresenter {
  static toHTTP(comment: CommentDetails) {
    return {
      id: comment.id,
      content: comment.content,
      authorId: comment.authorId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      likeCount: comment.likeCount,
      author: comment.author,
    };
  }
}
