import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";
import { CommunityBloggerRepository } from "../../repositories/community-blogger-repository";
import { CommunityBlogger } from "@/domain/blog/enterprise/entities/community-blogger";

interface CreateBloggersCommunityUseCaseRequest {
  authorId: string;
  description: string;
  slug: string;
  name: string;
  avatarUrl: string | null;
}

interface CreateBloggersCommunityUseCaseResponse {
  bloggerCommunity: BloggersCommunity;
}

export class CreateBloggersCommunityUseCase {
  constructor(
    private readonly bloggerCommunityRepository: BloggersCommunityRepository,
    private readonly communityBloggerRepository: CommunityBloggerRepository
  ) {}
  async execute({
    authorId,
    avatarUrl,
    description,
    name,
    slug,
  }: CreateBloggersCommunityUseCaseRequest): Promise<CreateBloggersCommunityUseCaseResponse> {
    const newBloggerCommunity = BloggersCommunity.create({
      authorId,
      avatarUrl,
      description,
      name,
      slug,
    });

    const bloggerCommunity = await this.bloggerCommunityRepository.save(
      newBloggerCommunity
    );

    const communityBlogger = CommunityBlogger.create({
      bloggerCommunityId: bloggerCommunity.id,
      bloggerId: authorId,
    });

    await this.communityBloggerRepository.save(communityBlogger);

    return { bloggerCommunity: newBloggerCommunity };
  }
}
