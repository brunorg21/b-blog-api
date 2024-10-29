import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { appDataSource } from "..";
import { Repository } from "typeorm";

export class TypeormBloggerRepository implements BloggerRepository {
  private typeormBloggerRepository: Repository<Blogger>;

  constructor() {
    this.typeormBloggerRepository = appDataSource.getRepository(Blogger);
  }
  async save(blogger: Blogger): Promise<void> {
    await this.typeormBloggerRepository.create(blogger);
  }
  async getById(id: string): Promise<Blogger | null> {
    const blogger = await this.typeormBloggerRepository.findOneBy({ id });

    if (!blogger) {
      return null;
    }

    return blogger;
  }
  async getAll(): Promise<Blogger[]> {
    const bloggers = await this.typeormBloggerRepository.find();

    return bloggers;
  }
  async update(blogger: Blogger): Promise<void> {
    await this.typeormBloggerRepository.save(blogger);
  }
  async findByEmail(email: string): Promise<Blogger | null> {
    const blogger = await this.typeormBloggerRepository.findOneBy({ email });

    if (!blogger) {
      return null;
    }

    return blogger;
  }
  async delete(blogger: Blogger): Promise<void> {
    await this.typeormBloggerRepository.remove(blogger);
  }
}
