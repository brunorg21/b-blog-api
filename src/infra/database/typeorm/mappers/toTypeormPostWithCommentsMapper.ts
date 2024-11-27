import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostEntity } from "../schemas/post";
import { ToTypeormBloggerCommunityMapper } from "./toTypeormBloggerCommunityMapper";
import { ToTypeormPostTopicsMapper } from "./toTypeormPostTopicsMapper";
import { PostWithComments } from "@/domain/blog/enterprise/entities/value-objects/post-with-comments";
import { ToTypeormCommentMapper } from "./toTypeormCommentMapper";

export class ToTypeormPostWithCommentsMapper {
  static toPostEntity(post: Post): PostEntity {
    return {
      id: post.id,
      authorId: post.authorId,
      bloggerCommunityId: post.bloggerCommunityId,
      content: post.content,
      createdAt: post.createdAt,
      title: post.title,
      updatedAt: post.updatedAt,
      likeCount: post.likeCount,
    };
  }

  static toDomain(postEntity: PostEntity): PostWithComments {
    return PostWithComments.create({
      authorId: postEntity.authorId,
      content: postEntity.content,
      likeCount: postEntity.likeCount,
      title: postEntity.title,
      postTopics:
        postEntity.postTopics?.map(ToTypeormPostTopicsMapper.toDomain) ?? [],
      author: postEntity.author?.name ?? "",
      bloggerCommunity: postEntity.bloggerCommunity 
      ? ToTypeormBloggerCommunityMapper.toDomain(postEntity.bloggerCommunity)
      : null,
      createdAt: postEntity.createdAt!,
      postId: postEntity.id,
      updatedAt: postEntity.updatedAt,
      comments: postEntity.comments?.map(
        ToTypeormCommentMapper.toPostCommentDomain) ?? []
    });
  }
}
