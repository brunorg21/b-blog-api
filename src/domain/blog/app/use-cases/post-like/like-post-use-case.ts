import { PostRepository } from "../../repositories/post-repostitory";
import { OnLikePostSubscriber } from "@/domain/notification/app/subscribers/on-like-post";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface LikePostUseCaseRequest {
  authorId: string;
  postId: string;
}

interface LikePostUseCaseResponse {
  post: Post;
}

export class LikePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly onLikePostSubscriber: OnLikePostSubscriber
  ) {}

  async execute({
    authorId,
    postId,
  }: LikePostUseCaseRequest): Promise<LikePostUseCaseResponse> {
    const post = await this.postRepository.getById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    post.likeCount += 1;

    await this.postRepository.update(post);

    await this.onLikePostSubscriber.execute({
      likeAuthorId: authorId,
      postId: post.id,
    });

    return { post };
  }
}
