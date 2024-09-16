import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { UserAlreadyExistsError } from "../@errors/user-already-exists-error";

import { compare, hash } from "bcrypt";
import { InvalidCredentialsError } from "../@errors/invalid-credentials";

interface AuthenticateBloggerUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateBloggerUseCaseResponse {
  blogger: Blogger;
}

export class AuthenticateBloggerUseCase {
  constructor(private readonly bloggerRepository: BloggerRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateBloggerUseCaseRequest): Promise<AuthenticateBloggerUseCaseResponse> {
    const blogger = await this.bloggerRepository.findByEmail(email);

    if (!blogger) {
      throw new InvalidCredentialsError();
    }

    const passwordHash = await compare(password, blogger.password);

    if (!passwordHash) {
      throw new InvalidCredentialsError();
    }

    return { blogger };
  }
}
