import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { BloggerCommunityWithPosts } from "@/domain/blog/enterprise/entities/value-objects/blogger-community-with-posts";
import { PaginatedParams } from "@/core/params";

interface GetBloggersCommunityBySlugUseCaseRequest {
  slug: string;
  params: PaginatedParams;
}

interface GetBloggersCommunityBySlugUseCaseResponse {
  bloggersCommunity: BloggerCommunityWithPosts;
}

export class GetBloggersCommunityBySlugUseCase {
  constructor(
    private readonly bloggersCommunityRepository: BloggersCommunityRepository
  ) {}
  async execute({
    slug,
    params,
  }: GetBloggersCommunityBySlugUseCaseRequest): Promise<GetBloggersCommunityBySlugUseCaseResponse> {
    const bloggersCommunity = await this.bloggersCommunityRepository.getBySlug(
      slug,
      params
    );

    if (!bloggersCommunity) {
      throw new ResourceNotFoundError();
    }

    return { bloggersCommunity };
  }
}
