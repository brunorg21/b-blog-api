import { PostCommentLike } from "../../enterprise/entities/post-comment-like";

export interface PostCommentLikeRepository {
  save(postCommentLike: PostCommentLike): Promise<void>;
  getById(postCommentLikeId: string): Promise<PostCommentLike | null>;
  getByCommentId(postCommentLikeId: string): Promise<PostCommentLike | null>;
  getAll(): Promise<PostCommentLike[]>;
  delete(postCommentLike: PostCommentLike): Promise<void>;
}
