import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";

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
    private readonly bloggercommunityRepository: BloggersCommunityRepository
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

    await this.bloggercommunityRepository.save(newBloggerCommunity);

    return { bloggerCommunity: newBloggerCommunity };
  }
}
