import { OnLikeCommentSubscriber } from "@/domain/notification/app/subscribers/on-like-comment";
import { PostCommentRepository } from "../../repositories/post-comment-repository";
import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface LikeCommentUseCaseRequest {
  authorId: string;
  postCommentId: string;
}

interface LikeCommentUseCaseResponse {
  postComment: PostComment;
}

export class LikeCommentUseCase {
  constructor(
    private readonly postCommentRepository: PostCommentRepository,
    private readonly onLikeCommentSubscriber: OnLikeCommentSubscriber
  ) {}
  async execute({
    authorId,
    postCommentId,
  }: LikeCommentUseCaseRequest): Promise<LikeCommentUseCaseResponse> {
    const postComment = await this.postCommentRepository.getById(postCommentId);

    if (!postComment) {
      throw new ResourceNotFoundError();
    }

    postComment.likeCount += 1;

    await this.postCommentRepository.update(postComment);

    await this.onLikeCommentSubscriber.execute({
      commentId: postComment.id,
      likeCommentAuthorId: authorId,
    });

    return { postComment };
  }
}
