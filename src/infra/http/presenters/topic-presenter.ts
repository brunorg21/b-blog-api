import { Topic } from "@/domain/blog/enterprise/entities/topic";

export class TopicPresenter {
  static toHTTP(topic: Topic) {
    return {
      id: topic.id,
      name: topic.name,
      slug: topic.slug,
    };
  }
}
