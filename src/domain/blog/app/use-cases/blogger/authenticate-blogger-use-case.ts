import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerRepository } from "../../repositories/blogger-repository";

import { InvalidCredentialsError } from "../@errors/invalid-credentials";
import { Hasher } from "@/domain/cryptography/hasher";

interface AuthenticateBloggerUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateBloggerUseCaseResponse {
  blogger: Blogger;
}

export class AuthenticateBloggerUseCase {
  constructor(
    private readonly bloggerRepository: BloggerRepository,
    private readonly hasher: Hasher
  ) {}
  async execute({
    email,
    password,
  }: AuthenticateBloggerUseCaseRequest): Promise<AuthenticateBloggerUseCaseResponse> {
    const blogger = await this.bloggerRepository.findByEmail(email);

    if (!blogger) {
      throw new InvalidCredentialsError();
    }

    const passwordHash = await this.hasher.compare({
      hash: blogger.password,
      value: password,
    });

    if (!passwordHash) {
      throw new InvalidCredentialsError();
    }

    return { blogger };
  }
}
