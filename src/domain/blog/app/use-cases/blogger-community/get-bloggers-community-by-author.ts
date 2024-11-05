import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { CommunityBloggerRepository } from "../../repositories/community-blogger-repository";

interface GetBloggersCommunityByBloggerUseCaseRequest {
  bloggerId: string;
}

interface GetBloggersCommunityByBloggerUseCaseResponse {
  bloggersCommunities: BloggersCommunity[];
}

export class GetBloggersCommunityByBloggerUseCase {
  constructor(
    private readonly communityBloggerRepository: CommunityBloggerRepository,
    private readonly bloggerCommunityRepository: BloggersCommunityRepository
  ) {}

  async execute({
    bloggerId,
  }: GetBloggersCommunityByBloggerUseCaseRequest): Promise<GetBloggersCommunityByBloggerUseCaseResponse> {
    const communityBloggers =
      await this.communityBloggerRepository.getAllByBloggerId(bloggerId);

    const bloggersCommunities = await Promise.all(
      communityBloggers.map((communityBlogger) =>
        this.bloggerCommunityRepository.getAllById(
          communityBlogger.bloggerCommunityId
        )
      )
    );

    return { bloggersCommunities: bloggersCommunities[0] };
  }
}
