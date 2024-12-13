import { PaginatedParams } from "@/core/params";
import { PostComment } from "../../enterprise/entities/post-comment";
import { CommentDetails } from "../../enterprise/entities/value-objects/comment-details";

export interface PostCommentRepository {
  save(postComment: PostComment): Promise<void>;
  getById(postCommentId: string): Promise<PostComment | null>;
  getByPost(params: PaginatedParams, postId: string): Promise<CommentDetails[]>;
  update(postComment: PostComment): Promise<void>;
  delete(postComment: PostComment): Promise<void>;
}
