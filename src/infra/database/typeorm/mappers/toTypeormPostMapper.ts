import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostEntity } from "../schemas/post";

export class ToTypeormPostMapper {
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

  static toDomain(postEntity: PostEntity): Post {
    return Post.create(
      {
        authorId: postEntity.authorId,
        bloggerCommunityId: postEntity.bloggerCommunityId,
        content: postEntity.content,
        likeCount: postEntity.likeCount,
        title: postEntity.title,
        topics: postEntity.postTopics?.map((e) => e.topicId) ?? [],
      },
      postEntity.id
    );
  }
}
