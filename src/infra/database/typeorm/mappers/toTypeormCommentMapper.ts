import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { CommentEntity } from "../schemas/comment";

export class ToTypeormCommentMapper {
  static toCommentEntityForPost(postComment: PostComment): CommentEntity {
    return {
      id: postComment.id,
      authorId: postComment.authorId,
      content: postComment.content,
      postId: postComment.postId,
      createdAt: postComment.createdAt,
      updatedAt: postComment.updatedAt,
      likeCount: postComment.likeCount,
    };
  }

  static toPostCommentDomain(comment: CommentEntity): PostComment {
    return PostComment.create(
      {
        authorId: comment.authorId,
        content: comment.content,
        likeCount: comment.likeCount,
        postId: comment.postId,
      },
      comment.id
    );
  }
}
