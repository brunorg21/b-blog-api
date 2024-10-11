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

    const postWithLikes = await this.postLikeRepository.getByPostId(post.id);

    if (postWithLikes) {
      postWithLikes.count += 1;

      await this.postLikeRepository.save(postWithLikes);

      await this.onLikePostSubscriber.execute({
        likeAuthorId: authorId,
        postId: post.id,
      });

      return { postLike: postWithLikes };
    }

    const postLike = PostLike.create({
      authorId,
      postId: post.id,
      count: 1,
    });

    await this.postLikeRepository.save(postLike);

    await this.onLikePostSubscriber.execute({
      likeAuthorId: authorId,
      postId: post.id,
    });

    return { postLike };
  }
}
