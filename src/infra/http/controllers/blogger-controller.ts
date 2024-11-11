import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { ControllerBase } from "./controller-base";
import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { RegisterBloggerUseCase } from "@/domain/blog/app/use-cases/blogger/register-blogger-use-case";

import {
  AuthenticateRequestProps,
  BloggerControllerInterface,
} from "./interfaces/blogger-controller-interface";
import { AuthenticateBloggerUseCase } from "@/domain/blog/app/use-cases/blogger/authenticate-blogger-use-case";
import { Hasher } from "@/domain/cryptography/hasher";
import { UpdateBloggerUseCase } from "@/domain/blog/app/use-cases/blogger/update-blogger-use-case";
import { DeleteBloggerUseCase } from "@/domain/blog/app/use-cases/blogger/delete-blogger-use-case";
import { BloggerEntity } from "@/infra/database/typeorm/schemas/blogger";

export class BloggerController
  implements ControllerBase<BloggerEntity>, BloggerControllerInterface
{
  private readonly registerBloggerUseCase: RegisterBloggerUseCase;
  private readonly authenticateBloggerUseCase: AuthenticateBloggerUseCase;
  private readonly updateBloggerUseCase: UpdateBloggerUseCase;
  private readonly deleteBloggerUseCase: DeleteBloggerUseCase;

  constructor(bloggerRepository: BloggerRepository, hasher: Hasher) {
    this.registerBloggerUseCase = new RegisterBloggerUseCase(
      bloggerRepository,
      hasher
    );
    this.authenticateBloggerUseCase = new AuthenticateBloggerUseCase(
      bloggerRepository,
      hasher
    );
    this.updateBloggerUseCase = new UpdateBloggerUseCase(bloggerRepository);
    this.deleteBloggerUseCase = new DeleteBloggerUseCase(bloggerRepository);
  }

  async authenticate(data: AuthenticateRequestProps): Promise<Blogger> {
    const { blogger } = await this.authenticateBloggerUseCase.execute(data);

    return blogger;
  }

  async create(data: BloggerEntity): Promise<void> {
    await this.registerBloggerUseCase.execute({
      avatarUrl: data.avatarUrl,
      bloggersCommunities: null,
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role as "ADMIN" | "COMMON",
    });
  }

  async update(id: string, data: BloggerEntity): Promise<void> {
    await this.updateBloggerUseCase.execute({
      id,
      avatarUrl: data.avatarUrl,
      email: data.email,
      name: data.name,
    });
  }
  async delete(id: string): Promise<void> {
    await this.deleteBloggerUseCase.execute({ bloggerId: id });
  }
}
