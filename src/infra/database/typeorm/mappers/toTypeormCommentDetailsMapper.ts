import { Comment } from "@/domain/blog/enterprise/entities/comment";
import { CommentEntity } from "../schemas/comment";
import { ToTypeormBloggerCommunityMapper } from "./toTypeormBloggerCommunityMapper";
import { ToTypeormTopicMapper } from "./toTypeormTopicMapper";
import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { CommentDetails } from "@/domain/blog/enterprise/entities/value-objects/comment-details";

export class ToTypeormCommentDetailsMapper {
  static toCommentEntity(comment: PostComment): CommentEntity {
    return {
      id: comment.id,
      authorId: comment.authorId,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      likeCount: comment.likeCount,
      postId: comment.postId,
    };
  }

  static toDomain(commentEntity: CommentEntity): CommentDetails {
    return CommentDetails.create({
      authorId: commentEntity.authorId,
      content: commentEntity.content,
      likeCount: commentEntity.likeCount,
      author: commentEntity.author?.name ?? "",
      id: commentEntity.id,
      createdAt: commentEntity.createdAt!,
      updatedAt: commentEntity.updatedAt,
    });
  }
}
