import { BloggerRepository } from "../../repositories/blogger-repository";
import { BloggersCommunityRepository } from "../../repositories/bloggers-community-repository";

import { NotAllowedError } from "../@errors/not-allowed-error";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface DeleteBloggersCommunityUseCaseRequest {
  id: string;
  authorId: string;
}

export class DeleteBloggersCommunityUseCase {
  constructor(
    private readonly bloggersCommunityRepository: BloggersCommunityRepository,
    private readonly bloggerRepository: BloggerRepository
  ) {}
  async execute({
    id,
    authorId,
  }: DeleteBloggersCommunityUseCaseRequest): Promise<void> {
    const bloggersCommunity = await this.bloggersCommunityRepository.getById(
      id
    );

    if (!bloggersCommunity) {
      throw new ResourceNotFoundError();
    }

    const blogger = await this.bloggerRepository.getById(authorId);

    if (blogger?.role !== "ADMIN" && bloggersCommunity.authorId !== authorId) {
      throw new NotAllowedError();
    }

    await this.bloggersCommunityRepository.delete(bloggersCommunity);
  }
}
