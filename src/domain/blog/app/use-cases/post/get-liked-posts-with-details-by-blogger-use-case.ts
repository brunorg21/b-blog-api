import { PostRepository } from "../../repositories/post-repostitory";
import { PaginatedParams } from "@/core/params";
import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";

interface GetLikedPostsWithDetailsByBloggerUseCaseRequest {
  params: PaginatedParams;
  bloggerId: string;
}

interface GetLikedPostsWithDetailsByBloggerUseCaseResponse {
  posts: PostDetails[];
}

export class GetLikedPostsWithDetailsByBloggerUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    params,
    bloggerId,
  }: GetLikedPostsWithDetailsByBloggerUseCaseRequest): Promise<GetLikedPostsWithDetailsByBloggerUseCaseResponse> {
    const posts = await this.postRepository.getLikedPostsWithDetailsByBlogger(
      bloggerId,
      params
    );

    return { posts };
  }
}
