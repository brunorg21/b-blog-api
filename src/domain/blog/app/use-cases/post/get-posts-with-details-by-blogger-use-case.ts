import { PostRepository } from "../../repositories/post-repostitory";
import { PaginatedParams } from "@/core/params";
import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";

interface GetPostWithDetailsByBloggerUseCaseRequest {
  params: PaginatedParams;
  bloggerId: string;
}

interface GetPostWithDetailsByBloggerUseCaseResponse {
  posts: PostDetails[];
}

export class GetPostWithDetailsByBloggerUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    params,
    bloggerId,
  }: GetPostWithDetailsByBloggerUseCaseRequest): Promise<GetPostWithDetailsByBloggerUseCaseResponse> {
    const posts = await this.postRepository.getPostsWithDetailsByBlogger(
      bloggerId,
      params
    );

    return { posts };
  }
}
