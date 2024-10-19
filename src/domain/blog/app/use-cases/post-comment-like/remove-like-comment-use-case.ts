import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

import { PostCommentRepository } from "../../repositories/post-comment-repository";

interface RemoveCommentLikeUseCaseRequest {
  commentId: string;
}

export class RemoveCommentLikeUseCase {
  constructor(private readonly postCommentRepository: PostCommentRepository) {}

  async execute({ commentId }: RemoveCommentLikeUseCaseRequest): Promise<void> {
    const post = await this.postCommentRepository.getById(commentId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    post.likeCount -= 1;

    await this.postCommentRepository.update(post);
  }
}
