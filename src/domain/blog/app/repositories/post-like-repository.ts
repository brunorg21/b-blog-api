import { PostLike } from "../../enterprise/entities/post-like";

export interface PostLikeRepository {
  save(postLike: PostLike): Promise<void>;
  getByPostId(postId: string): Promise<PostLike | null>;
  getById(id: string): Promise<PostLike | null>;
  getAll(): Promise<PostLike[]>;
  delete(postLike: PostLike): Promise<void>;
}
