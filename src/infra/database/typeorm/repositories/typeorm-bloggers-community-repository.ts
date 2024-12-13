import { BloggersCommunityRepository } from "@/domain/blog/app/repositories/bloggers-community-repository";
import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { Repository } from "typeorm";
import { appDataSource } from "..";
import { BloggerCommunityEntity } from "../schemas/blogger-community";
import { ToTypeormBloggerCommunityMapper } from "../mappers/toTypeormBloggerCommunityMapper";
import { CacheRepository } from "@/infra/cache/cache-repository";

export class TypeormBloggerCommunityRepository
  implements BloggersCommunityRepository
{
  private typeormBloggerCommunityRepository: Repository<BloggerCommunityEntity>;
  private cacheRepository: CacheRepository;

  constructor(cacheRepository: CacheRepository) {
    this.typeormBloggerCommunityRepository = appDataSource.getRepository(
      BloggerCommunityEntity
    );
    this.cacheRepository = cacheRepository;
  }
  async getBySlug(slug: string): Promise<BloggersCommunity | null> {
    const cachedBloggerCommunity = await this.cacheRepository.get(
      `blogger-community-${slug}`
    );
    if (cachedBloggerCommunity) {
      return JSON.parse(cachedBloggerCommunity);
    }

    const bloggerCommunity =
      await this.typeormBloggerCommunityRepository.findOne({
        where: {
          slug,
        },
      });

    if (!bloggerCommunity) {
      return null;
    }

    await this.cacheRepository.set(
      `blogger-community-${slug}`,
      JSON.stringify(bloggerCommunity)
    );

    return ToTypeormBloggerCommunityMapper.toDomain(bloggerCommunity);
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
  async getById(bloggerCommunityId: string): Promise<BloggersCommunity | null> {
    const bloggerComunity =
      await this.typeormBloggerCommunityRepository.findOne({
        where: {
          id: bloggerCommunityId,
        },
      });

    if (!bloggerComunity) {
      return null;
    }

    return ToTypeormBloggerCommunityMapper.toDomain(bloggerComunity);
  }
  async update(bloggersCommunity: BloggersCommunity): Promise<void> {
    await this.typeormBloggerCommunityRepository.update(bloggersCommunity.id, {
      description: bloggersCommunity.description,
      name: bloggersCommunity.name,
      updatedAt: bloggersCommunity.updatedAt,
      slug: bloggersCommunity.slug,
    });

    await this.cacheRepository.delete(
      `blogger-community-${bloggersCommunity.slug}`
    );
  }
  async delete(bloggersCommunity: BloggersCommunity): Promise<void> {
    await this.typeormBloggerCommunityRepository.remove({
      authorId: bloggersCommunity.authorId,
      avatarUrl: bloggersCommunity.avatarUrl,
      description: bloggersCommunity.description,
      id: bloggersCommunity.id,
      name: bloggersCommunity.name,
      slug: bloggersCommunity.slug,
      updatedAt: bloggersCommunity.updatedAt ?? null,
      createdAt: bloggersCommunity.createdAt,
    });
  }
  async getAllByAuthorId(bloggerId: string): Promise<BloggersCommunity[]> {
    const bloggersCommunities =
      await this.typeormBloggerCommunityRepository.find({
        where: {
          authorId: bloggerId,
        },
        order: {
          createdAt: "DESC",
        },
      });

    return bloggersCommunities.map(ToTypeormBloggerCommunityMapper.toDomain);
  }
}
