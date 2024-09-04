import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostRepository } from "../../repositories/post-repostitory";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface GetUniquePostUseCaseRequest {
  id: string;
}

interface GetUniquePostUseCaseResponse {
  post: Post;
}

export class GetUniquePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    id,
  }: GetUniquePostUseCaseRequest): Promise<GetUniquePostUseCaseResponse> {
    const post = await this.postRepository.getById(id);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    return { post };
  }
}
