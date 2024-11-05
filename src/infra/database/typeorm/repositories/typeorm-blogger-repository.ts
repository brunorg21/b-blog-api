import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { appDataSource } from "..";
import { Repository } from "typeorm";
import { BloggerEntity } from "../schemas/blogger";
import { ToTypeormBloggerMapper } from "../mappers/toTypeormBloggerMapper";

export class TypeormBloggerRepository implements BloggerRepository {
  private typeormBloggerRepository: Repository<BloggerEntity>;

  constructor() {
    this.typeormBloggerRepository = appDataSource.getRepository(BloggerEntity);
  }
  async save(blogger: Blogger): Promise<void> {
    const typeormBlogger = ToTypeormBloggerMapper.toBloggerEntity(blogger);

    this.typeormBloggerRepository.create(typeormBlogger);
  }
  async getById(id: string): Promise<Blogger | null> {
    const blogger = await this.typeormBloggerRepository.findOneBy({ id });

    if (!blogger) {
      return null;
    }

    return ToTypeormBloggerMapper.toDomain(blogger);
  }
  async getAll(): Promise<Blogger[]> {
    const bloggers = await this.typeormBloggerRepository.find();

    return bloggers.map((blogger) => ToTypeormBloggerMapper.toDomain(blogger));
  }
  async update(blogger: Blogger): Promise<void> {
    await this.typeormBloggerRepository.save(blogger);
  }
  async findByEmail(email: string): Promise<Blogger | null> {
    const blogger = await this.typeormBloggerRepository.findOneBy({ email });

    if (!blogger) {
      return null;
    }

    return ToTypeormBloggerMapper.toDomain(blogger);
  }
  async delete(blogger: Blogger): Promise<void> {
    await this.typeormBloggerRepository.remove(blogger);
  }
}
