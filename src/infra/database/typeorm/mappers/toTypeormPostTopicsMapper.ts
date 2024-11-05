import { PostTopic } from "@/domain/blog/enterprise/entities/topic-post";
import { PostTopicsEntity } from "../schemas/post-topics";

export class ToTypeormPostTopicsMapper {
  static toPostTopicsEntity(postTopics: PostTopic): PostTopicsEntity {
    return {
      id: postTopics.id,
      postId: postTopics.postId,
      topicId: postTopics.topicId,
    };
  }

  static toDomain(postTopicsEntity: PostTopicsEntity): PostTopic {
    return PostTopic.create(
      {
        postId: postTopicsEntity.postId,
        topicId: postTopicsEntity.topicId,
      },
      postTopicsEntity.id
    );
  }
}
