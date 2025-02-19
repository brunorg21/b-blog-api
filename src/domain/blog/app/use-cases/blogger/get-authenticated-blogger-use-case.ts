import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface GetAuthenticatedBloggerUseCaseRequest {
  bloggerId: string;
}

interface GetAuthenticatedBloggerUseCaseResponse {
  blogger: Blogger;
}

export class GetAuthenticatedBloggerUseCase {
  constructor(private readonly bloggerRepository: BloggerRepository) {}
  async execute({
    bloggerId,
  }: GetAuthenticatedBloggerUseCaseRequest): Promise<GetAuthenticatedBloggerUseCaseResponse> {
    const blogger = await this.bloggerRepository.findById(bloggerId);

    if (!blogger) {
      throw new ResourceNotFoundError();
    }

    return { blogger };
  }
}
