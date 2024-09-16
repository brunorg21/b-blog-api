import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { UserAlreadyExistsError } from "../@errors/user-already-exists-error";

import { hash } from "bcrypt";

interface RegisterBloggerUseCaseRequest {
  bloggersCommunities: string[] | null;
  avatarUrl: string | null;
  email: string;
  name: string;
  password: string;
  role: "ADMIN" | "COMMON";
}

interface RegisterBloggerUseCaseResponse {
  blogger: Blogger;
}

export class RegisterBloggerUseCase {
  constructor(private readonly bloggerRepository: BloggerRepository) {}
  async execute(
    blogger: RegisterBloggerUseCaseRequest
  ): Promise<RegisterBloggerUseCaseResponse> {
    const bloggerWithSameEmail = await this.bloggerRepository.findByEmail(
      blogger.email
    );

    if (bloggerWithSameEmail) {
      throw new UserAlreadyExistsError(blogger.email);
    }

    blogger.password = await hash(blogger.password, 6);

    const newBlogger = Blogger.create(blogger);

    await this.bloggerRepository.save(newBlogger);

    return { blogger: newBlogger };
  }
}
