import { BloggerRepository } from "../../repositories/blogger-repository";
import { PostCommentRepository } from "../../repositories/post-comment-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface DeletePostCommentUseCaseRequest {
  postCommentId: string;
  bloggerId: string;
}

export class DeletePostCommentUseCase {
  constructor(
    private readonly postcommentRepository: PostCommentRepository,
    private readonly bloggerRepository: BloggerRepository
  ) {}
  async execute({
    postCommentId,
    bloggerId,
  }: DeletePostCommentUseCaseRequest): Promise<void> {
    const postComment = await this.postcommentRepository.getById(postCommentId);

    if (!postComment) {
      throw new ResourceNotFoundError();
    }

    const blogger = await this.bloggerRepository.getById(bloggerId);

    if (blogger?.role !== "ADMIN" && postComment.authorId !== bloggerId) {
      throw new NotAllowedError();
    }

    await this.postcommentRepository.delete(postComment);
  }
}
