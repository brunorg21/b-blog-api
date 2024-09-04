import { PostRepository } from "../../repositories/post-repostitory";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface DeletePostUseCaseRequest {
  id: string;
}

export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ id }: DeletePostUseCaseRequest): Promise<void> {
    const post = await this.postRepository.getById(id);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    await this.postRepository.delete(post);
  }
}
