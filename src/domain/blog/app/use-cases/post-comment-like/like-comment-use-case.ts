import { OnLikeCommentSubscriber } from "@/domain/notification/app/subscribers/on-like-comment";

import { PostCommentLikeRepository } from "../../repositories/post-comment-like-repository";
import { PostCommentRepository } from "../../repositories/post-comment-repository";
import { PostCommentLike } from "@/domain/blog/enterprise/entities/post-comment-like";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface PostCommentLikeUseCaseRequest {
  authorId: string;
  postCommentId: string;
}

interface PostCommentLikeUseCaseResponse {
  postCommentLike: PostCommentLike;
}

export class PostCommentLikeUseCase {
  constructor(
    private readonly postCommentLikeRepository: PostCommentLikeRepository,
    private readonly postCommentRepository: PostCommentRepository,
    private readonly onLikeCommentSubscriber: OnLikeCommentSubscriber
  ) {}
  async execute({
    authorId,
    postCommentId,
  }: PostCommentLikeUseCaseRequest): Promise<PostCommentLikeUseCaseResponse> {
    const postComment = await this.postCommentRepository.getById(postCommentId);

    if (!postComment) {
      throw new ResourceNotFoundError();
    }

    const postCommentLike = PostCommentLike.create({
      authorId,
      commentId: postComment.id,
    });

    await this.postCommentLikeRepository.save(postCommentLike);

    await this.onLikeCommentSubscriber.execute({
      commentId: postComment.id,
      likeCommentAuthorId: authorId,
    });

    return { postCommentLike };
  }
}
