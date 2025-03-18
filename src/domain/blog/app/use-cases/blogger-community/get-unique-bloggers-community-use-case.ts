import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { BloggerCommunityWithPosts } from "@/domain/blog/enterprise/entities/value-objects/blogger-community-with-posts";

interface GetUniqueBloggersCommunityUseCaseRequest {
  id: string;
}

interface GetUniqueBloggersCommunityUseCaseResponse {
  bloggersCommunity: BloggerCommunityWithPosts;
}

export class GetUniqueBloggersCommunityUseCase {
  constructor(
    private readonly bloggersCommunityRepository: BloggersCommunityRepository
  ) {}
  async execute({
    id,
  }: GetUniqueBloggersCommunityUseCaseRequest): Promise<GetUniqueBloggersCommunityUseCaseResponse> {
    const bloggersCommunity =
      await this.bloggersCommunityRepository.getBloggersCommunityWithPosts(id);

    if (!bloggersCommunity) {
      throw new ResourceNotFoundError();
    }

    return { bloggersCommunity };
  }
}
