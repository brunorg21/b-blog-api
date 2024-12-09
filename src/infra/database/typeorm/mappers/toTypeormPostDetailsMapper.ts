import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostEntity } from "../schemas/post";
import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";
import { ToTypeormBloggerCommunityMapper } from "./toTypeormBloggerCommunityMapper";
import { ToTypeormPostTopicsMapper } from "./toTypeormPostTopicsMapper";
import { ToTypeormTopicMapper } from "./toTypeormTopicMapper";

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
      topics:
        postEntity.postTopics && postEntity.postTopics.length > 0
          ? postEntity.postTopics.map((topic) =>
              ToTypeormTopicMapper.toDomain({
                id: topic.topic?.id ?? "",
                name: topic.topic?.name ?? "",
                slug: topic.topic?.slug ?? "",
              })
            )
          : [],
      author: postEntity.author?.name ?? "",
      bloggerCommunity: postEntity.bloggerCommunity
        ? ToTypeormBloggerCommunityMapper.toDomain(postEntity.bloggerCommunity)
        : null,
      createdAt: postEntity.createdAt!,
      postId: postEntity.id,
      updatedAt: postEntity.updatedAt,
    });
  }
}
