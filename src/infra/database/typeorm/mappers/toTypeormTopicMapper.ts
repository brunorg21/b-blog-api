import { Topic } from "@/domain/blog/enterprise/entities/topic";
import { TopicEntity } from "../schemas/topic";

export class ToTypeormTopicMapper {
  static toTopicEntity(topic: Topic): TopicEntity {
    return {
      id: topic.id,
      name: topic.name,
      slug: topic.slug,
    };
  }

  static toDomain(topic: TopicEntity): Topic {
    return Topic.create(
      {
        name: topic.name,
        slug: topic.slug,
      },
      topic.id
    );
  }
}
