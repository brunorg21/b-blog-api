import { PostCommentLike } from "@/domain/blog/enterprise/entities/post-comment-like";
import { PostCommentLikeRepository } from "../../repositories/post-comment-like-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";

interface RemovePostCommentLikeUseCaseRequest {
  postCommentId: string;
  bloggerId: string;
}

export class RemovePostCommentLikeUseCase {
  constructor(
    private readonly postCommentLikeRepository: PostCommentLikeRepository,
    private readonly bloggerRepository: BloggerRepository
  ) {}

  async execute({
    bloggerId,
    postCommentId,
  }: RemovePostCommentLikeUseCaseRequest): Promise<void> {
    const postCommentLike = await this.postCommentLikeRepository.getById(
      postCommentId
    );

    if (!postCommentLike) {
      throw new ResourceNotFoundError();
    }

    const blogger = await this.bloggerRepository.getById(bloggerId);

    if (blogger?.role !== "ADMIN" && postCommentLike.authorId !== bloggerId) {
      throw new NotAllowedError();
    }

    await this.postCommentLikeRepository.delete(postCommentLike);
  }
}
