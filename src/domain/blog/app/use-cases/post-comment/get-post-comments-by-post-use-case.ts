import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { PostCommentRepository } from "../../repositories/post-comment-repository";
import { PaginatedParams } from "@/core/params";
import { CommentDetails } from "@/domain/blog/enterprise/entities/value-objects/comment-details";

interface GetPostCommentsByPostUseCaseRequest {
  params: PaginatedParams;
  postId: string;
}

interface GetPostCommentsByPostUseCaseResponse {
  postComments: CommentDetails[];
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
