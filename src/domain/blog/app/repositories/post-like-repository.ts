import { PostLike } from "../../enterprise/entities/post-like";

export interface PostLikeRepository {
  save(postLike: PostLike): Promise<void>;
  getById(postLikeId: string): Promise<PostLike | null>;
  getAll(): Promise<PostLike[]>;
  delete(postLike: PostLike): Promise<void>;
}
