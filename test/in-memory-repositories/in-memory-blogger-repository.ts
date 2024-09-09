import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { Blogger } from "@/domain/blog/enterprise/entities/blogger";

export class InMemoryBloggerRepository implements BloggerRepository {
  public bloggers: Blogger[] = [];
  async save(blogger: Blogger): Promise<void> {
    this.bloggers.push(blogger);
  }
  async getById(id: string): Promise<Blogger | null> {
    const blogger = this.bloggers.find((blogger) => blogger.id === id);

    if (!blogger) {
      return null;
    }

    return blogger;
  }
  async getAll(): Promise<Blogger[]> {
    return this.bloggers;
  }

  async update(blogger: Blogger): Promise<void> {
    const bloggerIndex = this.bloggers.findIndex((p) => p.id === blogger.id);
    this.bloggers[bloggerIndex] = blogger;
  }
  async delete(blogger: Blogger): Promise<void> {
    const bloggers = this.bloggers.filter((p) => p.id !== blogger.id);

    this.bloggers = bloggers;
  }
}
