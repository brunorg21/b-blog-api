import { PostTopic } from "@/domain/blog/enterprise/entities/topic-post";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { PostRepository } from "../../repositories/post-repostitory";
import { PostTopicsRepository } from "../../repositories/post-topics-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { PostLikeRepository } from "../../repositories/post-like-repository";
import { BloggerAlreadyLikePostError } from "../@errors/blogger-already-like-post-error";
import { PostLike } from "@/domain/blog/enterprise/entities/post-like";

interface LikePostUseCaseRequest {
  postId: string;
  bloggerId: string;
}

export class LikePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postLikeRepository: PostLikeRepository
  ) {}
  async execute({ bloggerId, postId }: LikePostUseCaseRequest): Promise<void> {
    const post = await this.postRepository.getById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    const alreadyLikeThisPost = await this.postLikeRepository.getByBloggerId(
      bloggerId,
      postId
    );

    if (alreadyLikeThisPost) {
      throw new BloggerAlreadyLikePostError();
    }


    post.likeCount += 1;

    await this.postRepository.update(post);
    await this.postLikeRepository.save(
      PostLike.create({
        postId,
        bloggerId,
      })
    );
  }
}
