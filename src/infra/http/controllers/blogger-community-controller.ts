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

export class BloggerCommunityController
  implements
    ControllerBase<BloggersCommunity>,
    BloggerCommunityControllerInterface
{
  private readonly createBloggerCommunityUseCase: CreateBloggersCommunityUseCase;
  private readonly getBloggersCommunityByAuthorUseCase: GetBloggersCommunityByBloggerUseCase;
  private readonly deleteBloggerCommunityUseCase: DeleteBloggersCommunityUseCase;
  private readonly updateBloggerCommunityUseCase: UpdateBloggersCommunityUseCase;
  private readonly getUniqueBloggerCommunityUseCase: GetUniqueBloggersCommunityUseCase;
  private readonly getAllBloggersCommunityUseCase: GetAllBloggersCommunitiesUseCase;

  constructor(
    bloggerCommunityRepository: BloggersCommunityRepository,
    bloggerRepository: BloggerRepository
  ) {
    this.createBloggerCommunityUseCase = new CreateBloggersCommunityUseCase(
      bloggerCommunityRepository
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
    this.getUniqueBloggerCommunityUseCase =
      new GetUniqueBloggersCommunityUseCase(bloggerCommunityRepository);
    this.getAllBloggersCommunityUseCase = new GetAllBloggersCommunitiesUseCase(
      bloggerCommunityRepository,
      bloggerRepository
    );
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

  async getUniqueBloggersCommunity(id: string): Promise<BloggersCommunity> {
    const { bloggersCommunity } =
      await this.getUniqueBloggerCommunityUseCase.execute({ id });

    return bloggersCommunity;
  }

  async getBloggerCommunitiesByAuthor(
    bloggerId: string
  ): Promise<BloggersCommunity[]> {
    const { bloggersCommunities } =
      await this.getBloggersCommunityByAuthorUseCase.execute({ bloggerId });

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
