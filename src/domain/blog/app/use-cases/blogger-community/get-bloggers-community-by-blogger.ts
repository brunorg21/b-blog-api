import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface GetBloggersCommunityByBloggerUseCaseRequest {
  bloggerId: string;
}

interface GetBloggersCommunityByBloggerUseCaseResponse {
  bloggersCommunities: BloggersCommunity[];
}

export class GetBloggersCommunityByBloggerUseCase {
  constructor(
    private readonly bloggersCommunityRepository: BloggersCommunityRepository
  ) {}
  async execute({
    bloggerId,
  }: GetBloggersCommunityByBloggerUseCaseRequest): Promise<GetBloggersCommunityByBloggerUseCaseResponse> {
    const bloggersCommunities =
      await this.bloggersCommunityRepository.getAllByBloggerId(bloggerId);

    return { bloggersCommunities };
  }
}
