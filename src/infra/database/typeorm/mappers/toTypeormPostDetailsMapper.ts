import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostEntity } from "../schemas/post";
import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";
import { BloggerEntity } from "../schemas/blogger";
import { CommentEntity } from "../schemas/comment";
import { TopicEntity } from "../schemas/topic";
import { BloggerCommunityEntity } from "../schemas/blogger-community";
import { ToTypeormTopicMapper } from "./toTypeormTopicMapper";
import { ToTypeormBloggerMapper } from "./toTypeormBloggerMapper";
import { ToTypeormBloggerCommunityMapper } from "./toTypeormBloggerCommunityMapper";
import { ToTypeormCommentMapper } from "./toTypeormCommentMapper";
import { ToTypeormPostTopicsMapper } from "./toTypeormPostTopicsMapper";

export class ToTypeormPostDetailsMapper {
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

  static toDomain(postEntity: PostEntity): PostDetails {
    return PostDetails.create({
      authorId: postEntity.authorId,
      content: postEntity.content,
      likeCount: postEntity.likeCount,
      title: postEntity.title,
      postTopics:
        postEntity.postTopics?.map(ToTypeormPostTopicsMapper.toDomain) ?? [],
      author: postEntity.author?.name ?? "",
      bloggerCommunity: ToTypeormBloggerCommunityMapper.toDomain(
        postEntity.bloggerCommunity!
      ),
      comments:
        postEntity.comments?.map(ToTypeormCommentMapper.toPostCommentDomain) ??
        [],
      createdAt: postEntity.createdAt!,
      postId: postEntity.id,
      updatedAt: postEntity.updatedAt,
    });
  }
}
