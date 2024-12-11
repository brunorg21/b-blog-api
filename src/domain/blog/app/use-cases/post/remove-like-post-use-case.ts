import { PostRepository } from "../../repositories/post-repostitory";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { PostLikeRepository } from "../../repositories/post-like-repository";

interface RemoveLikePostUseCaseRequest {
  postId: string;
  bloggerId: string;
}

export class RemoveLikePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postLikeRepository: PostLikeRepository
  ) {}
  async execute({
    bloggerId,
    postId,
  }: RemoveLikePostUseCaseRequest): Promise<void> {
    const post = await this.postRepository.getById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    const postLike = await this.postLikeRepository.getByBloggerId(
      bloggerId,
      postId
    );

    if (!postLike) {
      throw new ResourceNotFoundError();
    }

    await this.postLikeRepository.delete(postLike);

    post.likeCount -= 1;

    await this.postRepository.update(post);
  }
}
