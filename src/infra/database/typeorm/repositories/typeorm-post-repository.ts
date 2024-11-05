import { appDataSource } from "..";
import { Repository } from "typeorm";
import { PostEntity } from "../schemas/post";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { ToTypeormPostMapper } from "../mappers/toTypeormPostMapper";
import { PostRepository } from "@/domain/blog/app/repositories/post-repostitory";

export class TypeormPostRepository implements PostRepository {
  private typeormPostRepository: Repository<PostEntity>;

  constructor() {
    this.typeormPostRepository = appDataSource.getRepository(PostEntity);
  }
  async getAll(): Promise<Post[]> {
    const posts = await this.typeormPostRepository.find();

    return posts.map((post) => ToTypeormPostMapper.toDomain(post));
  }

  async save(post: Post): Promise<void> {
    const typeormPost = ToTypeormPostMapper.toPostEntity(post);

    this.typeormPostRepository.create(typeormPost);
  }
  async getById(id: string): Promise<Post | null> {
    const post = await this.typeormPostRepository.findOneBy({
      id,
    });

    if (!post) {
      return null;
    }

    return ToTypeormPostMapper.toDomain(post);
  }

  async update(post: Post): Promise<void> {
    await this.typeormPostRepository.save(post);
  }

  async delete(post: Post): Promise<void> {
    await this.typeormPostRepository.remove(post);
  }
}
