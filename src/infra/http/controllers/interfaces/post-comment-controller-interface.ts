import { PaginatedParams } from "@/core/params";
import { CommentDetails } from "@/domain/blog/enterprise/entities/value-objects/comment-details";

export interface LikePostCommentProps {
  commentId: string;
  bloggerId: string;
}
export interface UpdatePostCommentProps {
  authorId: string;
  content: string;
  postCommentId: string;
}

export interface PostCommentControllerInterface {
  likePostComment(data: LikePostCommentProps): Promise<void>;
  removeLikePostComment(data: LikePostCommentProps): Promise<void>;
  updatePostComment(data: UpdatePostCommentProps): Promise<void>;
   getPostCommentsByPost(params: PaginatedParams, postId: string): Promise<CommentDetails[]>;
}
