import { PaginatedParams } from "@/core/params";
import { Post } from "../../enterprise/entities/post";

export interface PostRepository {
  save(post: Post): Promise<void>;
  getById(id: string): Promise<Post | null>;
  getAll(params: PaginatedParams, topic?: string): Promise<Post[]>;
  update(post: Post): Promise<void>;
  delete(post: Post): Promise<void>;
}
