import { Topic } from "@/domain/blog/enterprise/entities/topic";
import { TopicRepository } from "../../repositories/topic-repository";

interface GetTopicsUseCaseResponse {
  topics: Topic[];
}

export class GetTopicsUseCase {
  constructor(private readonly topicRepository: TopicRepository) {}
  async execute(): Promise<GetTopicsUseCaseResponse> {
    const topics = await this.topicRepository.getAll();

    return { topics };
  }
}
