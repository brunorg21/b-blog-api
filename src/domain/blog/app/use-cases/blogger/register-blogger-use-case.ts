import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { UserAlreadyExistsError } from "../@errors/user-already-exists-error";
import { Hasher } from "@/domain/cryptography/hasher";

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
    private readonly hasher: Hasher
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
