import { PostTopic } from "../../enterprise/entities/topic-post";

export interface PostTopicsRepository {
  save(post: PostTopic): Promise<void>;
  getById(id: string): Promise<PostTopic | null>;
  getByPostId(postId: string): Promise<PostTopic[]>;
  getAll(topic?: string): Promise<PostTopic[]>;
  update(post: PostTopic): Promise<void>;
  delete(post: PostTopic): Promise<void>;
}
