import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { NotAllowedError } from "../@errors/not-allowed-error";

interface GetAllBloggersCommunitiesUseCaseRequest {
  bloggerId: string;
}

interface GetAllBloggersCommunitiesUseCaseResponse {
  bloggersCommunities: BloggersCommunity[];
}

export class GetAllBloggersCommunitiesUseCase {
  constructor(
    private readonly bloggerCommunityRepository: BloggersCommunityRepository,
    private readonly bloggerRepository: BloggerRepository
  ) {}

  async execute({
    bloggerId,
  }: GetAllBloggersCommunitiesUseCaseRequest): Promise<GetAllBloggersCommunitiesUseCaseResponse> {
    const blogger = await this.bloggerRepository.findById(bloggerId);

    if (!blogger) {
      throw new ResourceNotFoundError();
    }

    if (blogger.role !== "ADMIN") {
      throw new NotAllowedError();
    }

    const bloggersCommunities = await this.bloggerCommunityRepository.getAll();

    return { bloggersCommunities };
  }
}
