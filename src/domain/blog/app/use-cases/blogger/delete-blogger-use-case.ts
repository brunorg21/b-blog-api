import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface DeleteBloggerUseCaseRequest {
  bloggerId: string;
}

interface DeleteBloggerUseCaseResponse {
  blogger: Blogger;
}

export class DeleteBloggerUseCase {
  constructor(private readonly bloggerRepository: BloggerRepository) {}
  async execute({
    bloggerId,
  }: DeleteBloggerUseCaseRequest): Promise<DeleteBloggerUseCaseResponse> {
    const blogger = await this.bloggerRepository.findById(bloggerId);

    if (!blogger) {
      throw new ResourceNotFoundError();
    }

    await this.bloggerRepository.delete(blogger);

    return { blogger };
  }
}
