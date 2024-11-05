import { appDataSource } from "..";
import { Repository } from "typeorm";

import { ToTypeormPostTopicsMapper } from "../mappers/toTypeormPostTopicsMapper";
import { PostTopicsRepository } from "@/domain/blog/app/repositories/post-topics-repository";
import { PostTopicsEntity } from "../schemas/post-topics";
import { PostTopic } from "@/domain/blog/enterprise/entities/topic-post";

export class TypeormPostTopicsRepository implements PostTopicsRepository {
  private typeormPostTopicsRepository: Repository<PostTopicsEntity>;

  constructor() {
    this.typeormPostTopicsRepository =
      appDataSource.getRepository(PostTopicsEntity);
  }
  async getAll(): Promise<PostTopic[]> {
    const posttopicss = await this.typeormPostTopicsRepository.find();

    return posttopicss.map((posttopics) =>
      ToTypeormPostTopicsMapper.toDomain(posttopics)
    );
  }

  async save(posttopics: PostTopic): Promise<void> {
    const typeormPostTopics =
      ToTypeormPostTopicsMapper.toPostTopicsEntity(posttopics);

    this.typeormPostTopicsRepository.create(typeormPostTopics);
  }
  async getById(id: string): Promise<PostTopic | null> {
    const posttopics = await this.typeormPostTopicsRepository.findOneBy({
      id,
    });

    if (!posttopics) {
      return null;
    }

    return ToTypeormPostTopicsMapper.toDomain(posttopics);
  }

  async update(posttopics: PostTopic): Promise<void> {
    await this.typeormPostTopicsRepository.save(posttopics);
  }

  async delete(posttopics: PostTopic): Promise<void> {
    await this.typeormPostTopicsRepository.remove(posttopics);
  }
}
