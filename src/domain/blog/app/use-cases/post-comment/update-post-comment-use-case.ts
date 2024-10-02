import { BloggerRepository } from "../../repositories/blogger-repository";
import { PostCommentRepository } from "../../repositories/post-comment-repository";

import { NotAllowedError } from "../@errors/not-allowed-error";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface UpdatePostCommentUseCaseRequest {
  postCommentId: string;
  content: string;
  authorId: string;
}

export class UpdatePostCommentUseCase {
  constructor(
    private readonly postcommentRepository: PostCommentRepository,
    private readonly bloggerRepository: BloggerRepository
  ) {}
  async execute({
    postCommentId,
    content,
    authorId,
  }: UpdatePostCommentUseCaseRequest): Promise<void> {
    const postComment = await this.postcommentRepository.getById(postCommentId);

    if (!postComment) {
      throw new ResourceNotFoundError();
    }

    const blogger = await this.bloggerRepository.getById(authorId);

    if (blogger?.role !== "ADMIN" && postComment.authorId !== blogger?.id) {
      throw new NotAllowedError();
    }

    postComment.content = content;

    await this.postcommentRepository.update(postComment);
  }
}
