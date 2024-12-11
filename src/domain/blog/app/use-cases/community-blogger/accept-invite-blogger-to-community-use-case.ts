import { CommunityBloggerRepository } from "../../repositories/community-blogger-repository";
import { CommunityBlogger } from "@/domain/blog/enterprise/entities/community-blogger";
import { BloggerAlreadyMemberOfCommunityError } from "../@errors/blogger-already-member-of-community-error";
import { BloggerRepository } from "../../repositories/blogger-repository";

interface InviteBloggerToCommunityUseCaseRequest {
  bloggerId: string;
  bloggerCommunityId: string;
}

interface InviteBloggerToCommunityUseCaseResponse {
  communityBlogger: CommunityBlogger;
}

export class InviteBloggerToCommunityUseCase {
  constructor(
    private readonly communityBloggerRepository: CommunityBloggerRepository,
    private readonly bloggerRepository: BloggerRepository
  ) {}
  async execute(
    communityBlogger: InviteBloggerToCommunityUseCaseRequest
  ): Promise<InviteBloggerToCommunityUseCaseResponse> {
    const communitiesByBlogger =
      await this.communityBloggerRepository.getAllByBloggerId(
        communityBlogger.bloggerId
      );

    const alreadyMemberOfCommunity = communitiesByBlogger.find(
      (community) =>
        community.bloggerCommunityId === communityBlogger.bloggerCommunityId
    );

    if (alreadyMemberOfCommunity) {
      const blogger = await this.bloggerRepository.getById(
        alreadyMemberOfCommunity.bloggerId
      );

      throw new BloggerAlreadyMemberOfCommunityError(blogger?.name ?? "");
    }

    const newCommunityBlogger = CommunityBlogger.create({
      bloggerCommunityId: communityBlogger.bloggerCommunityId,
      bloggerId: communityBlogger.bloggerId,
    });

    await this.communityBloggerRepository.save(newCommunityBlogger);

    return { communityBlogger: newCommunityBlogger };
  }
}
