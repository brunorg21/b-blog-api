import { TopicRepository } from "../../repositories/topic-repository";

import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface DeleteTopicUseCaseRequest {
  topicId: string;
}

export class DeleteTopicUseCase {
  constructor(private readonly topicRepository: TopicRepository) {}
  async execute({ topicId }: DeleteTopicUseCaseRequest): Promise<void> {
    const topic = await this.topicRepository.getById(topicId);

    if (!topic) {
      throw new ResourceNotFoundError();
    }

    await this.topicRepository.delete(topic);
  }
}
