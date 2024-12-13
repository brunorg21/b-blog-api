import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface GetBloggersCommunityBySlugUseCaseRequest {
  slug: string;
}

interface GetBloggersCommunityBySlugUseCaseResponse {
  bloggersCommunity: BloggersCommunity;
}

export class GetBloggersCommunityBySlugUseCase {
  constructor(
    private readonly bloggersCommunityRepository: BloggersCommunityRepository
  ) {}
  async execute({
    slug,
  }: GetBloggersCommunityBySlugUseCaseRequest): Promise<GetBloggersCommunityBySlugUseCaseResponse> {
    const bloggersCommunity = await this.bloggersCommunityRepository.getBySlug(
      slug
    );

    if (!bloggersCommunity) {
      throw new ResourceNotFoundError();
    }

    return { bloggersCommunity };
  }
}
