import { BloggersCommunityRepository } from "@/domain/blog/app/repositories/bloggers-community-repository";
import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { In, Repository } from "typeorm";
import { appDataSource } from "..";
import { BloggerCommunityEntity } from "../schemas/blogger-community";
import { ToTypeormBloggerCommunityMapper } from "../mappers/toTypeormBloggerCommunityMapper";
import { CacheRepository } from "@/infra/cache/cache-repository";
import { BloggerCommunityWithPosts } from "@/domain/blog/enterprise/entities/value-objects/blogger-community-with-posts";
import { ToTypeormBloggerCommunityWithPostsMapper } from "../mappers/toTypeormBloggerCommunityWithPostsMapper";
import { PaginatedParams } from "@/core/params";
import { PostEntity } from "../schemas/post";

export class TypeormBloggerCommunityRepository
  implements BloggersCommunityRepository
{
  private typeormBloggerCommunityRepository: Repository<BloggerCommunityEntity>;
  private typeormPostRepository: Repository<PostEntity>;
  private cacheRepository: CacheRepository;

  constructor(cacheRepository: CacheRepository) {
    this.typeormBloggerCommunityRepository = appDataSource.getRepository(
      BloggerCommunityEntity
    );
    this.typeormPostRepository = appDataSource.getRepository(PostEntity);
    this.cacheRepository = cacheRepository;
  }

  async getByIds(bloggerCommunityIds: string[]): Promise<BloggersCommunity[]> {
    const bloggersCommunities =
      await this.typeormBloggerCommunityRepository.find({
        where: { id: In(bloggerCommunityIds) },
      });

    return bloggersCommunities.map(ToTypeormBloggerCommunityMapper.toDomain);
  }
  async getBySlug(
    slug: string,
    { page }: PaginatedParams
  ): Promise<BloggerCommunityWithPosts | null> {
    const cachedBloggerCommunity = await this.cacheRepository.get(
      `blogger-community-${slug}`
    );
    // if (cachedBloggerCommunity) {
    //   const bloggerCommunityCachedParse = JSON.parse(cachedBloggerCommunity);

    //   return ToTypeormBloggerCommunityWithPostsMapper.toDomain(
    //     bloggerCommunityCachedParse
    //   );
    // }

    const bloggerCommunity =
      await this.typeormBloggerCommunityRepository.findOne({
        where: {
          slug,
        },
        relations: {
          posts: {
            author: true,
            bloggerCommunity: true,
            postTopics: {
              topic: true,
            },
          },
          author: true,
        },
      });

    if (!bloggerCommunity) {
      return null;
    }

    const posts = await this.typeormPostRepository.find({
      where: {
        bloggerCommunity: {
          id: bloggerCommunity.id,
        },
      },
      relations: {
        author: true,
        bloggerCommunity: true,
        postTopics: {
          topic: true,
        },
      },
      order: {
        createdAt: "ASC",
      },
      skip: (page - 1) * 10,
      take: 10,
    });

    bloggerCommunity.posts = posts;

    await this.cacheRepository.set(
      `blogger-community-${slug}`,
      JSON.stringify(bloggerCommunity)
    );

    return ToTypeormBloggerCommunityWithPostsMapper.toDomain(bloggerCommunity);
  }
  async getAll(): Promise<BloggersCommunity[]> {
    const bloggerCommunities =
      await this.typeormBloggerCommunityRepository.find();

    return bloggerCommunities.map(ToTypeormBloggerCommunityMapper.toDomain);
  }

  async save(bloggersCommunity: BloggersCommunity): Promise<BloggersCommunity> {
    const bloggerCommunity = await this.typeormBloggerCommunityRepository.save({
      authorId: bloggersCommunity.authorId,
      avatarUrl: bloggersCommunity.avatarUrl,
      description: bloggersCommunity.description,
      name: bloggersCommunity.name,
      slug: bloggersCommunity.slug,
    });

    return ToTypeormBloggerCommunityMapper.toDomain(bloggerCommunity);
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
