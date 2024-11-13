import { BloggerRepository } from "../../repositories/blogger-repository";
import { PostRepository } from "../../repositories/post-repostitory";
import { NotAllowedError } from "../@errors/not-allowed-error";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface DeletePostUseCaseRequest {
  id: string;
  bloggerId: string;
}

export class DeletePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly bloggerRepository: BloggerRepository
  ) {}

  async execute({ id, bloggerId }: DeletePostUseCaseRequest): Promise<void> {
    const post = await this.postRepository.getById(id);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    const blogger = await this.bloggerRepository.getById(bloggerId);

    if (blogger?.role !== "ADMIN" && post.authorId !== bloggerId) {
      throw new NotAllowedError();
    }

    await this.postRepository.delete(post);
  }
}
