import { PostRepository } from "../../repositories/post-repostitory";
import { PaginatedParams } from "@/core/params";
import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";

interface GetPostsWithDetailsUseCaseRequest {
  params: PaginatedParams;
}

interface GetPostsWithDetailsUseCaseResponse {
  posts: PostDetails[];
}

export class GetPostsWithDetailsUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    params,
  }: GetPostsWithDetailsUseCaseRequest): Promise<GetPostsWithDetailsUseCaseResponse> {
    const posts = await this.postRepository.getPostsWithDetails(params);

    return { posts };
  }
}
