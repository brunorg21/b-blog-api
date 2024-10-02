import { PostComment } from "../../enterprise/entities/post-comment";
import { PostCommentLike } from "../../enterprise/entities/post-comment-like";

export interface PostCommentRepository {
  save(postComment: PostComment): Promise<void>;
  getById(postCommentId: string): Promise<PostComment | null>;
  update(postComment: PostComment): Promise<void>;
  delete(postComment: PostComment): Promise<void>;
}
