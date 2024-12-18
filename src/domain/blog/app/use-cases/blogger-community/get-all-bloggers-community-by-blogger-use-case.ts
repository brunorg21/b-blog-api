import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { NotAllowedError } from "../@errors/not-allowed-error";
import { CommunityBloggerRepository } from "../../repositories/community-blogger-repository";

interface GetAllBloggersCommunitiesByBloggerUseCaseRequest {
  bloggerId: string;
}

interface GetAllBloggersCommunitiesByBloggerUseCaseResponse {
  bloggersCommunities: BloggersCommunity[];
}

export class GetAllBloggersCommunitiesByBloggerUseCase {
  constructor(
    private readonly bloggerCommunityRepository: BloggersCommunityRepository,
    private readonly communityBloggerRepository: CommunityBloggerRepository
  ) {}

  async execute({
    bloggerId,
  }: GetAllBloggersCommunitiesByBloggerUseCaseRequest): Promise<GetAllBloggersCommunitiesByBloggerUseCaseResponse> {
    const communityBloggers =
      await this.communityBloggerRepository.getAllByBloggerId(bloggerId);

    const bloggersCommunities = await this.bloggerCommunityRepository.getByIds(
      communityBloggers.map(
        (communityBlogger) => communityBlogger.bloggerCommunityId
      )
    );

    return { bloggersCommunities };
  }
}
