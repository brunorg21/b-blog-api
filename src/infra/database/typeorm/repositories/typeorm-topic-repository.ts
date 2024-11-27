import { appDataSource } from "..";
import { Repository } from "typeorm";
import { TopicEntity } from "../schemas/topic";
import { TopicRepository } from "@/domain/blog/app/repositories/topic-repository";
import { Topic } from "@/domain/blog/enterprise/entities/topic";
import { ToTypeormTopicMapper } from "../mappers/toTypeormTopicMapper";

export class TypeormTopicRepository implements TopicRepository {
  private typeormTopicRepository: Repository<TopicEntity>;

  constructor() {
    this.typeormTopicRepository = appDataSource.getRepository(TopicEntity);
  }
  async getAll(): Promise<Topic[]> {
    const topics = await this.typeormTopicRepository.find();

    return topics.map((topic) => ToTypeormTopicMapper.toDomain(topic));
  }

  async save(topic: Topic): Promise<void> {
    const typeormTopic = ToTypeormTopicMapper.toTopicEntity(topic);

    this.typeormTopicRepository.save(typeormTopic);
  }
  async getById(id: string): Promise<Topic | null> {
    const topic = await this.typeormTopicRepository.findOneBy({
      id,
    });

    if (!topic) {
      return null;
    }

    return ToTypeormTopicMapper.toDomain(topic);
  }

  async update(topic: Topic): Promise<void> {
    await this.typeormTopicRepository.save(topic);
  }

  async delete(topic: Topic): Promise<void> {
    await this.typeormTopicRepository.remove(topic);
  }
}
