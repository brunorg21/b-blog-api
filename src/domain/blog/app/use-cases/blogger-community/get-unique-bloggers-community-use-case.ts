import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface GetUniqueBloggersCommunityUseCaseRequest {
  id: string;
}

interface GetUniqueBloggersCommunityUseCaseResponse {
  bloggersCommunity: BloggersCommunity;
}

export class GetUniqueBloggersCommunityUseCase {
  constructor(
    private readonly bloggersCommunityRepository: BloggersCommunityRepository
  ) {}
  async execute({
    id,
  }: GetUniqueBloggersCommunityUseCaseRequest): Promise<GetUniqueBloggersCommunityUseCaseResponse> {
    const bloggersCommunity = await this.bloggersCommunityRepository.getById(
      id
    );

    if (!bloggersCommunity) {
      throw new ResourceNotFoundError();
    }

    return { bloggersCommunity };
  }
}
