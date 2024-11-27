import { Topic } from "@/domain/blog/enterprise/entities/topic";
import { ControllerBase } from "./interfaces/controller-base";
import { CreateTopicUseCase } from "@/domain/blog/app/use-cases/topics/create-topic-use-case";
import { TopicRepository } from "@/domain/blog/app/repositories/topic-repository";
import { DeleteTopicUseCase } from "@/domain/blog/app/use-cases/topics/delete-topic-use-case";
import { GetTopicsUseCase } from "@/domain/blog/app/use-cases/topics/get-topics-use-case";

export class TopicController implements ControllerBase<Topic> {
  private readonly createTopicUseCase: CreateTopicUseCase;
  private readonly deleteTopicUseCase: DeleteTopicUseCase;
  private readonly getTopicsUseCase: GetTopicsUseCase;

  constructor(topicRepository: TopicRepository) {
    this.createTopicUseCase = new CreateTopicUseCase(topicRepository);
    this.deleteTopicUseCase = new DeleteTopicUseCase(topicRepository);
    this.getTopicsUseCase = new GetTopicsUseCase(topicRepository);
  }

  async create(data: Topic): Promise<void> {
    await this.createTopicUseCase.execute({
      name: data.name,
    });
  }

  async get(): Promise<Topic[]> {
    const { topics } = await this.getTopicsUseCase.execute();

    return topics;
  }

  async update(data: Topic): Promise<void> {}
  async delete(id: string): Promise<void> {
    await this.deleteTopicUseCase.execute({ topicId: id });
  }
}
