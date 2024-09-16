import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostRepository } from "../../repositories/post-repostitory";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { PaginatedParams } from "@/core/params";

interface GetPostsUseCaseRequest {
  params: PaginatedParams;
  topic?: string;
}

interface GetPostsUseCaseResponse {
  posts: Post[];
}

export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    params,
    topic,
  }: GetPostsUseCaseRequest): Promise<GetPostsUseCaseResponse> {
    const posts = await this.postRepository.getAll(params, topic);

    return { posts };
  }
}
