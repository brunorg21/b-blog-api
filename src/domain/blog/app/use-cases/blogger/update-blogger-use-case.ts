import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { UserAlreadyExistsError } from "../@errors/user-already-exists-error";

import { hash } from "bcrypt";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface UpdateBloggerUseCaseRequest {
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
    avatarUrl,
    email,
    name,
  }: UpdateBloggerUseCaseRequest): Promise<UpdateBloggerUseCaseResponse> {
    const blogger = await this.bloggerRepository.findByEmail(email);

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
