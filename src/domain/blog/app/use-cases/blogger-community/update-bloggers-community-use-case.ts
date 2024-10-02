import { generateSlug } from "@/core/generate-slug";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";

import { NotAllowedError } from "../@errors/not-allowed-error";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface UpdateBloggersCommunityUseCaseRequest {
  bloggerId: string;
  description: string;
  authorId: string;
  name: string;
}

export class UpdateBloggersCommunityUseCase {
  constructor(
    private readonly bloggersCommunityRepository: BloggersCommunityRepository,
    private readonly bloggerRepository: BloggerRepository
  ) {}
  async execute({
    bloggerId,
    description,
    authorId,
    name,
  }: UpdateBloggersCommunityUseCaseRequest): Promise<void> {
    const bloggersCommunity = await this.bloggersCommunityRepository.getById(
      bloggerId
    );

    if (!bloggersCommunity) {
      throw new ResourceNotFoundError();
    }

    const blogger = await this.bloggerRepository.getById(authorId);

    if (
      blogger?.role !== "ADMIN" &&
      bloggersCommunity.authorId !== blogger?.id
    ) {
      throw new NotAllowedError();
    }

    bloggersCommunity.description = description;
    bloggersCommunity.name = name;
    bloggersCommunity.slug = generateSlug(name);

    await this.bloggersCommunityRepository.update(bloggersCommunity);
  }
}
