import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface UpdateBloggerUseCaseRequest {
  id: string;
  avatarUrl: string | null;
  email: string;
  name: string;
}

interface UpdateBloggerUseCaseResponse {
  blogger: Blogger;
}

export class UpdateBloggerUseCase {
  constructor(private readonly bloggerRepository: BloggerRepository) {}
  async execute({
    id,
    avatarUrl,
    email,
    name,
  }: UpdateBloggerUseCaseRequest): Promise<UpdateBloggerUseCaseResponse> {
    const blogger = await this.bloggerRepository.findById(id);

    if (!blogger) {
      throw new ResourceNotFoundError();
    }

    blogger.name = name;
    blogger.email = email;
    blogger.avatarUrl = avatarUrl;

    await this.bloggerRepository.update(blogger);

    return { blogger };
  }
}
