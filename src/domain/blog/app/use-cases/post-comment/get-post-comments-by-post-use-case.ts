import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { PostCommentRepository } from "../../repositories/post-comment-repository";
import { PaginatedParams } from "@/core/params";

interface GetPostCommentsByPostUseCaseRequest {
  params: PaginatedParams;
  postId: string;
}

interface GetPostCommentsByPostUseCaseResponse {
  postComments: PostComment[];
}

export class GetPostCommentsUseCase {
  constructor(private readonly postCommentRepository: PostCommentRepository) {}
  async execute({
    params,
    postId,
  }: GetPostCommentsByPostUseCaseRequest): Promise<GetPostCommentsByPostUseCaseResponse> {
    const postComments = await this.postCommentRepository.getByPost(
      params,
      postId
    );

    return { postComments };
  }
}
