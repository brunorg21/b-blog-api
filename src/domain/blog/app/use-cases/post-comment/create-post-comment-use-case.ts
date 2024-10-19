import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { PostCommentRepository } from "../../repositories/post-comment-repository";

interface CreatePostCommentUseCaseRequest {
  authorId: string;
  postId: string;
  content: string;
}

interface CreatePostCommentUseCaseResponse {
  postcomment: PostComment;
}

export class CreatePostCommentUseCase {
  constructor(private readonly postcommentRepository: PostCommentRepository) {}
  async execute({
    authorId,
    content,
    postId,
  }: CreatePostCommentUseCaseRequest): Promise<CreatePostCommentUseCaseResponse> {
    const newPostComment = PostComment.create({
      authorId,
      content,
      postId,
      likeCount: 0,
    });

    await this.postcommentRepository.save(newPostComment);

    return { postcomment: newPostComment };
  }
}
