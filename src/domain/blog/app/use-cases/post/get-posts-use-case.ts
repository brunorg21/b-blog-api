import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostRepository } from "../../repositories/post-repostitory";
import { PaginatedParams } from "@/core/params";

interface GetPostsUseCaseRequest {
  params: PaginatedParams;
}

interface GetPostsUseCaseResponse {
  posts: Post[];
}

export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    params,
  }: GetPostsUseCaseRequest): Promise<GetPostsUseCaseResponse> {
    const posts = await this.postRepository.getAll(params);

    return { posts };
  }
}
