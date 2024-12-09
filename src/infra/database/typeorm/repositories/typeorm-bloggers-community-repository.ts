import { BloggersCommunityRepository } from "@/domain/blog/app/repositories/bloggers-community-repository";
import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { Repository } from "typeorm";
import { appDataSource } from "..";
import { BloggerCommunityEntity } from "../schemas/blogger-community";
import { ToTypeormBloggerCommunityMapper } from "../mappers/toTypeormBloggerCommunityMapper";

export class TypeormBloggerCommunityRepository
  implements BloggersCommunityRepository
{
  private typeormBloggerCommunityRepository: Repository<BloggerCommunityEntity>;

  constructor() {
    this.typeormBloggerCommunityRepository = appDataSource.getRepository(
      BloggerCommunityEntity
    );
  }
  async getAll(): Promise<BloggersCommunity[]> {
    const bloggerCommunities =
      await this.typeormBloggerCommunityRepository.find();

    return bloggerCommunities.map(ToTypeormBloggerCommunityMapper.toDomain);
  }

  async save(bloggersCommunity: BloggersCommunity): Promise<void> {
    this.typeormBloggerCommunityRepository.save({
      authorId: bloggersCommunity.authorId,
      avatarUrl: bloggersCommunity.avatarUrl,
      description: bloggersCommunity.description,
      name: bloggersCommunity.name,
      slug: bloggersCommunity.slug,
    });
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

    return ToTypeormBloggerCommunityMapper.toDomain(bloggerComunity);
  }
  async update(bloggersCommunity: BloggersCommunity): Promise<void> {
    await this.typeormBloggerCommunityRepository.update(
      bloggersCommunity.id,
      bloggersCommunity
    );
  }
  async delete(bloggersCommunity: BloggersCommunity): Promise<void> {
    await this.typeormBloggerCommunityRepository.remove(bloggersCommunity);
  }
  async getAllByAuthorId(bloggerId: string): Promise<BloggersCommunity[]> {
    const bloggersCommunities =
      await this.typeormBloggerCommunityRepository.find({
        where: {
          authorId: bloggerId,
        },
      });

    return bloggersCommunities.map(ToTypeormBloggerCommunityMapper.toDomain);
  }
}
