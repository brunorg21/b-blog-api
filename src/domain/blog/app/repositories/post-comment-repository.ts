import { PaginatedParams } from "@/core/params";
import { PostComment } from "../../enterprise/entities/post-comment";

export interface PostCommentRepository {
  save(postComment: PostComment): Promise<void>;
  getById(postCommentId: string): Promise<PostComment | null>;
  getByPost(params: PaginatedParams, postId: string): Promise<PostComment[]>;
  update(postComment: PostComment): Promise<void>;
  delete(postComment: PostComment): Promise<void>;
}
