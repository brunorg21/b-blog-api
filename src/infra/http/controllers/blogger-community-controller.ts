import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { ControllerBase } from "./interfaces/controller-base";
import { CreateBloggersCommunityUseCase } from "@/domain/blog/app/use-cases/blogger-community/create-bloggers-community-use-case";
import { BloggersCommunityRepository } from "@/domain/blog/app/repositories/bloggers-community-repository";
import { GetBloggersCommunityByBloggerUseCase } from "@/domain/blog/app/use-cases/blogger-community/get-bloggers-community-by-author";
import {
  BloggerCommunityControllerInterface,
  UpdateBloggersCommunityRequest,
} from "./interfaces/blogger-community-interface";
import { DeleteBloggersCommunityUseCase } from "@/domain/blog/app/use-cases/blogger-community/delete-bloggers-community-use-case";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { UpdateBloggersCommunityUseCase } from "@/domain/blog/app/use-cases/blogger-community/update-bloggers-community-use-case";
import { GetUniqueBloggersCommunityUseCase } from "@/domain/blog/app/use-cases/blogger-community/get-unique-bloggers-community-use-case";
import { GetAllBloggersCommunitiesUseCase } from "@/domain/blog/app/use-cases/blogger-community/get-all-bloggers-community-use-case";
import { GetBloggersCommunityBySlugUseCase } from "@/domain/blog/app/use-cases/blogger-community/get-bloggers-community-by-slug-use-case";
import { GetAllBloggersCommunitiesByBloggerUseCase } from "@/domain/blog/app/use-cases/blogger-community/get-all-bloggers-community-by-blogger-use-case";
import { CommunityBloggerRepository } from "@/domain/blog/app/repositories/community-blogger-repository";
import { BloggerCommunityWithPosts } from "@/domain/blog/enterprise/entities/value-objects/blogger-community-with-posts";
import { PaginatedParams } from "@/core/params";

export class BloggerCommunityController
  implements
    ControllerBase<BloggersCommunity>,
    BloggerCommunityControllerInterface
{
  private readonly createBloggerCommunityUseCase: CreateBloggersCommunityUseCase;
  private readonly getBloggersCommunityByAuthorUseCase: GetBloggersCommunityByBloggerUseCase;
  private readonly deleteBloggerCommunityUseCase: DeleteBloggersCommunityUseCase;
  private readonly updateBloggerCommunityUseCase: UpdateBloggersCommunityUseCase;
  private readonly getAllBloggersCommunityUseCase: GetAllBloggersCommunitiesUseCase;
  private readonly getBloggersCommunityBySlugUseCase: GetBloggersCommunityBySlugUseCase;
  private readonly getBloggersCommunityByBloggerUseCase: GetAllBloggersCommunitiesByBloggerUseCase;

  constructor(
    bloggerCommunityRepository: BloggersCommunityRepository,
    bloggerRepository: BloggerRepository,
    communityRepository: CommunityBloggerRepository
  ) {
    this.createBloggerCommunityUseCase = new CreateBloggersCommunityUseCase(
      bloggerCommunityRepository,
      communityRepository
    );
    this.getBloggersCommunityByAuthorUseCase =
      new GetBloggersCommunityByBloggerUseCase(bloggerCommunityRepository);
    this.deleteBloggerCommunityUseCase = new DeleteBloggersCommunityUseCase(
      bloggerCommunityRepository,
      bloggerRepository
    );
    this.updateBloggerCommunityUseCase = new UpdateBloggersCommunityUseCase(
      bloggerCommunityRepository,
      bloggerRepository
    );

    this.getAllBloggersCommunityUseCase = new GetAllBloggersCommunitiesUseCase(
      bloggerCommunityRepository,
      bloggerRepository
    );
    this.getBloggersCommunityBySlugUseCase =
      new GetBloggersCommunityBySlugUseCase(bloggerCommunityRepository);
    this.getBloggersCommunityByBloggerUseCase =
      new GetAllBloggersCommunitiesByBloggerUseCase(
        bloggerCommunityRepository,
        communityRepository
      );
  }
  async getBySlug(slug: string, params: PaginatedParams): Promise<BloggerCommunityWithPosts> {
    const { bloggersCommunity } =
      await this.getBloggersCommunityBySlugUseCase.execute({ slug , params});

    return bloggersCommunity;
  }

  async create(data: BloggersCommunity): Promise<void> {
    await this.createBloggerCommunityUseCase.execute({
      authorId: data.authorId,
      avatarUrl: data.avatarUrl,
      description: data.description,
      name: data.name,
      slug: data.slug,
    });
  }

  async getBloggerCommunitiesByAuthor(
    bloggerId: string
  ): Promise<BloggersCommunity[]> {
    const { bloggersCommunities } =
      await this.getBloggersCommunityByAuthorUseCase.execute({ bloggerId });

    return bloggersCommunities;
  }
  async getBloggerCommunitiesByBlogger(
    bloggerId: string
  ): Promise<BloggersCommunity[]> {
    const { bloggersCommunities } =
      await this.getBloggersCommunityByBloggerUseCase.execute({ bloggerId });

    return bloggersCommunities;
  }

  async getAllBloggersCommunity(
    bloggerId: string
  ): Promise<BloggersCommunity[]> {
    const { bloggersCommunities } =
      await this.getAllBloggersCommunityUseCase.execute({
        bloggerId,
      });

    return bloggersCommunities;
  }

  async update(data: BloggersCommunity, bloggerId: string): Promise<void> {
    await this.updateBloggerCommunityUseCase.execute({
      bloggerId,
      bloggerCommunityId: data.id,
      description: data.description,
      name: data.name,
    });
  }
  async updateBloggerCommunity(
    data: UpdateBloggersCommunityRequest,
    bloggerId: string
  ): Promise<void> {
    await this.updateBloggerCommunityUseCase.execute({
      bloggerId,
      bloggerCommunityId: data.id,
      description: data.description,
      name: data.name,
    });
  }
  async delete(id: string, bloggerId: string): Promise<void> {
    await this.deleteBloggerCommunityUseCase.execute({
      authorId: bloggerId,
      id,
    });
  }
}
