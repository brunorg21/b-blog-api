import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { UserAlreadyExistsError } from "../@errors/user-already-exists-error";

import { hash } from "bcrypt";
import { HashGenerator } from "@/domain/cryptography/hash-generator";

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
  constructor(
    private readonly bloggerRepository: BloggerRepository,
    private readonly hasher: HashGenerator
  ) {}
  async execute(
    blogger: RegisterBloggerUseCaseRequest
  ): Promise<RegisterBloggerUseCaseResponse> {
    const bloggerWithSameEmail = await this.bloggerRepository.findByEmail(
      blogger.email
    );

    if (bloggerWithSameEmail) {
      throw new UserAlreadyExistsError(blogger.email);
    }

    blogger.password = await this.hasher.encrypt({
      salt: 8,
      value: blogger.password,
    });

    const newBlogger = Blogger.create(blogger);

    await this.bloggerRepository.save(newBlogger);

    return { blogger: newBlogger };
  }
}
