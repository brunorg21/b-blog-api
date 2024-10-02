import { OnLikeCommentSubscriber } from "@/domain/notification/app/subscribers/on-like-comment";

import { PostCommentRepository } from "../../repositories/post-comment-repository";

import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { PostLikeRepository } from "../../repositories/post-like-repository";
import { PostLike } from "@/domain/blog/enterprise/entities/post-like";
import { PostRepository } from "../../repositories/post-repostitory";
import { OnLikePostSubscriber } from "@/domain/notification/app/subscribers/on-like-post";

interface PostLikeUseCaseRequest {
  authorId: string;
  postId: string;
}

interface PostLikeUseCaseResponse {
  postLike: PostLike;
}

export class PostLikeUseCase {
  constructor(
    private readonly postLikeRepository: PostLikeRepository,
    private readonly postRepository: PostRepository,
    private readonly onLikePostSubscriber: OnLikePostSubscriber
  ) {}

  async execute({
    authorId,
    postId,
  }: PostLikeUseCaseRequest): Promise<PostLikeUseCaseResponse> {
    const post = await this.postRepository.getById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    const postLike = PostLike.create({
      authorId,
      postId: post.id,
    });

    await this.postLikeRepository.save(postLike);

    await this.onLikePostSubscriber.execute({
      likeAuthorId: authorId,
      postId: post.id,
    });

    return { postLike };
  }
}
