import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { ControllerBase } from "./interfaces/controller-base";
import { PostCommentRepository } from "@/domain/blog/app/repositories/post-comment-repository";
import { CreatePostCommentUseCase } from "@/domain/blog/app/use-cases/post-comment/create-post-comment-use-case";
import { UpdatePostCommentUseCase } from "@/domain/blog/app/use-cases/post-comment/update-post-comment-use-case";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { DeletePostCommentUseCase } from "@/domain/blog/app/use-cases/post-comment/delete-post-comment-use-case";
import { LikePostCommentUseCase } from "@/domain/blog/app/use-cases/post-comment/like-post-comment-use-case";
import { CommentLikeRepository } from "@/domain/blog/app/repositories/comment-like-repository";
import {
  LikePostCommentProps,
  PostCommentControllerInterface,
  UpdatePostCommentProps,
} from "./interfaces/post-comment-controller-interface";
import { RemoveLikeCommentUseCase } from "@/domain/blog/app/use-cases/post-comment/remove-like-comment-use-case";

export class PostCommentController
  implements ControllerBase<PostComment>, PostCommentControllerInterface
{
  private createPostCommentUseCase: CreatePostCommentUseCase;
  private updatePostCommentUseCase: UpdatePostCommentUseCase;
  private deletePostCommentUseCase: DeletePostCommentUseCase;
  private likePostCommentUseCase: LikePostCommentUseCase;
  private removeLikePostCommentUseCase: RemoveLikeCommentUseCase;
  constructor(
    postCommentRepository: PostCommentRepository,
    bloggerRepository: BloggerRepository,
    commentLikeRepository: CommentLikeRepository
  ) {
    this.createPostCommentUseCase = new CreatePostCommentUseCase(
      postCommentRepository
    );
    this.updatePostCommentUseCase = new UpdatePostCommentUseCase(
      postCommentRepository,
      bloggerRepository
    );
    this.deletePostCommentUseCase = new DeletePostCommentUseCase(
      postCommentRepository,
      bloggerRepository
    );
    this.likePostCommentUseCase = new LikePostCommentUseCase(
      postCommentRepository,
      commentLikeRepository
    );
    this.removeLikePostCommentUseCase = new RemoveLikeCommentUseCase(
      postCommentRepository,
      commentLikeRepository
    );
  }
  async updatePostComment({
    authorId,
    content,
    postCommentId,
  }: UpdatePostCommentProps): Promise<void> {
    await this.updatePostCommentUseCase.execute({
      authorId,
      content,
      postCommentId,
    });
  }
  async removeLikePostComment({
    bloggerId,
    commentId,
  }: LikePostCommentProps): Promise<void> {
    await this.removeLikePostCommentUseCase.execute({
      bloggerId,
      commentId,
    });
  }
  async likePostComment({
    commentId,
    bloggerId,
  }: LikePostCommentProps): Promise<void> {
    await this.likePostCommentUseCase.execute({
      bloggerId,
      commentId,
    });
  }
  async create(data: PostComment): Promise<void> {
    await this.createPostCommentUseCase.execute(data);
  }

  async update(data: PostComment, bloggerId?: string): Promise<void> {
    await this.updatePostCommentUseCase.execute({
      authorId: data.authorId,
      content: data.content,
      postCommentId: data.id,
    });
  }
  async delete(id: string, bloggerId?: string): Promise<void> {
    await this.deletePostCommentUseCase.execute({
      postCommentId: id,
      bloggerId: bloggerId!,
    });
  }
}
