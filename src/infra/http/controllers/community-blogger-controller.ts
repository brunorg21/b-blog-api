import { CommunityBloggerRepository } from "@/domain/blog/app/repositories/community-blogger-repository";
import { InviteBloggerToCommunityUseCase } from "@/domain/blog/app/use-cases/community-blogger/accept-invite-blogger-to-community-use-case";
import {
  CommunityBloggerControllerInterface,
  UpdateBloggerRequestProps,
} from "./interfaces/community-blogger-interface";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";

export class CommunityBloggerController
  implements CommunityBloggerControllerInterface
{
  private readonly inviteBloggerToCommunityUseCase: InviteBloggerToCommunityUseCase;

  constructor(
    communitybloggerRepository: CommunityBloggerRepository,
    bloggerRepository: BloggerRepository
  ) {
    this.inviteBloggerToCommunityUseCase =
      new InviteBloggerToCommunityUseCase(
        communitybloggerRepository,
        bloggerRepository
      );
  }
  async inviteBloggerToCommunity(data: UpdateBloggerRequestProps): Promise<void> {
    await this.inviteBloggerToCommunityUseCase.execute({
      bloggerId: data.bloggerId,
      bloggerCommunityId: data.bloggerCommunityId,
    });
  }
}
