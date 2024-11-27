import { PostRepository } from "../../repositories/post-repostitory";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { PostWithComments } from "@/domain/blog/enterprise/entities/value-objects/post-with-comments";

interface GetPostWithCommentsUseCaseRequest {
  id: string;
}

interface GetPostWithCommentsUseCaseResponse {
  postWithComments: PostWithComments;
}

export class GetPostWithCommentsUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    id,
  }: GetPostWithCommentsUseCaseRequest): Promise<GetPostWithCommentsUseCaseResponse> {
    const postWithComments = await this.postRepository.getPostWithComments(id);

    if (!postWithComments) {
      throw new ResourceNotFoundError();
    }

    return { postWithComments };
  }
}
