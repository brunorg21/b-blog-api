import { PostLike } from "../../enterprise/entities/post-like";

export interface PostLikeRepository {
  save(postLike: PostLike): Promise<void>;
  update(postLike: PostLike): Promise<void>;
  delete(postLike: PostLike): Promise<void>;
  getByPostId(postId: string): Promise<PostLike[]>;
  getByBloggerId(bloggerId: string, postId: string): Promise<PostLike | null>;
}
