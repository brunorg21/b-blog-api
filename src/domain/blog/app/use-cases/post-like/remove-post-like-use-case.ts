import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

import { PostRepository } from "../../repositories/post-repostitory";

interface RemovePostLikeUseCaseRequest {
  postId: string;
}

export class RemovePostLikeUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ postId }: RemovePostLikeUseCaseRequest): Promise<void> {
    const post = await this.postRepository.getById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    post.likeCount -= 1;

    await this.postRepository.update(post);
  }
}
