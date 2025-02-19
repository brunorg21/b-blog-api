import { Topic } from "@/domain/blog/enterprise/entities/topic";
import { TopicRepository } from "../../repositories/topic-repository";
import { generateSlug } from "@/core/generate-slug";

interface CreateTopicUseCaseRequest {
  name: string;
}

interface CreateTopicUseCaseResponse {
  topics: Topic[];
}

export class CreateTopicUseCase {
  constructor(private readonly topicRepository: TopicRepository) {}
  async execute(
    topics: CreateTopicUseCaseRequest[]
  ): Promise<CreateTopicUseCaseResponse> {
    let createdTopics: Topic[] = [];

    for (const topic of topics) {
      const newTopic = Topic.create({
        name: topic.name,
        slug: generateSlug(topic.name),
      });

      const createdTopic = await this.topicRepository.save(newTopic);

      createdTopics.push(createdTopic);
    }

    return { topics: createdTopics };
  }
}
