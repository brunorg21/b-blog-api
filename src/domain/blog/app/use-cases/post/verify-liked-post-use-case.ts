import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostRepository } from "../../repositories/post-repostitory";
import { PostTopicsRepository } from "../../repositories/post-topics-repository";
import { PostTopic } from "@/domain/blog/enterprise/entities/topic-post";

interface VerifyLikedPostUseCaseRequest {
  postId: string;
  bloggerId: string;
}

interface VerifyLikedPostUseCaseResponse {
  hasLiked: boolean;
}

export class VerifyLikedPostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    bloggerId,
    postId,
  }: VerifyLikedPostUseCaseRequest): Promise<VerifyLikedPostUseCaseResponse> {
    const hasLiked = await this.postRepository.verifyLikedPost(
      bloggerId,
      postId
    );

    return { hasLiked };
  }
}
