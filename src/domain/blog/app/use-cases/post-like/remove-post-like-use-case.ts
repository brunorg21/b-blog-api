import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";
import { PostLikeRepository } from "../../repositories/post-like-repository";

interface RemovePostLikeUseCaseRequest {
  postLikeId: string;
  bloggerId: string;
}

export class RemovePostLikeUseCase {
  constructor(
    private readonly postLikeRepository: PostLikeRepository,
    private readonly bloggerRepository: BloggerRepository
  ) {}

  async execute({
    bloggerId,
    postLikeId,
  }: RemovePostLikeUseCaseRequest): Promise<void> {
    const postLike = await this.postLikeRepository.getById(postLikeId);

    if (!postLike) {
      throw new ResourceNotFoundError();
    }

    const blogger = await this.bloggerRepository.getById(bloggerId);

    if (blogger?.role !== "ADMIN" && postLike.authorId !== bloggerId) {
      throw new NotAllowedError();
    }

    await this.postLikeRepository.delete(postLike);
  }
}
