import { BloggersCommunityRepository } from "@/domain/blog/app/repositories/bloggers-community-repository";
import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { Repository } from "typeorm";
import { appDataSource } from "..";

export class TypeormBloggerCommunityRepository
  implements BloggersCommunityRepository
{
  private typeormBloggerCommunityRepository: Repository<BloggersCommunity>;

  constructor() {
    this.typeormBloggerCommunityRepository =
      appDataSource.getRepository(BloggersCommunity);
  }

  async save(bloggersCommunity: BloggersCommunity): Promise<void> {
    this.typeormBloggerCommunityRepository.create(bloggersCommunity);
  }
  async getById(bloggerId: string): Promise<BloggersCommunity | null> {
    const bloggerComunity =
      await this.typeormBloggerCommunityRepository.findOne({
        where: {
          id: bloggerId,
        },
      });

    if (!bloggerComunity) {
      return null;
    }

    return bloggerComunity;
  }
  async update(bloggersCommunity: BloggersCommunity): Promise<void> {
    await this.typeormBloggerCommunityRepository.save(bloggersCommunity);
  }
  async delete(bloggersCommunity: BloggersCommunity): Promise<void> {
    await this.typeormBloggerCommunityRepository.remove(bloggersCommunity);
  }
  async getAllById(bloggerCommunityId: string): Promise<BloggersCommunity[]> {
    const bloggersCommunities =
      await this.typeormBloggerCommunityRepository.find({
        where: {
          id: bloggerCommunityId,
        },
      });

    return bloggersCommunities;
  }
}
