import { Topic } from "@/domain/blog/enterprise/entities/topic";
import { TopicRepository } from "../../repositories/topic-repository";
import { generateSlug } from "@/core/generate-slug";

interface CreateTopicUseCaseRequest {
  name: string;
}

interface CreateTopicUseCaseResponse {
  topic: Topic;
}

export class CreateTopicUseCase {
  constructor(private readonly topicRepository: TopicRepository) {}
  async execute(
    topic: CreateTopicUseCaseRequest
  ): Promise<CreateTopicUseCaseResponse> {
    const newTopic = Topic.create({
      name: topic.name,
      slug: generateSlug(topic.name),
    });

    await this.topicRepository.save(newTopic);

    return { topic: newTopic };
  }
}
