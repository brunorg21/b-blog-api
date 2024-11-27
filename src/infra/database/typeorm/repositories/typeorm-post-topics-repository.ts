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
  async getByPostId(postId: string): Promise<PostTopic[]> {
    const postTopics = await this.typeormPostTopicsRepository.find({
      where: {
        postId,
      },
    });

    return postTopics.map((postTopic) =>
      ToTypeormPostTopicsMapper.toDomain(postTopic)
    );
  }
  async getAll(): Promise<PostTopic[]> {
    const postTopics = await this.typeormPostTopicsRepository.find();

    return postTopics.map((postTopic) =>
      ToTypeormPostTopicsMapper.toDomain(postTopic)
    );
  }

  async save(postTopic: PostTopic): Promise<void> {
    const typeormPostTopic =
      ToTypeormPostTopicsMapper.toPostTopicsEntity(postTopic);

    this.typeormPostTopicsRepository.save(typeormPostTopic);
  }
  async getById(id: string): Promise<PostTopic | null> {
    const postTopic = await this.typeormPostTopicsRepository.findOneBy({
      id,
    });

    if (!postTopic) {
      return null;
    }

    return ToTypeormPostTopicsMapper.toDomain(postTopic);
  }

  async update(postTopic: PostTopic): Promise<void> {
    await this.typeormPostTopicsRepository.save(postTopic);
  }

  async delete(postTopic: PostTopic): Promise<void> {
    await this.typeormPostTopicsRepository.remove(postTopic);
  }
}
