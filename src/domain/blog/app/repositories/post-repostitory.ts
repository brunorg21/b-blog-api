import { PaginatedParams } from "@/core/params";
import { Post } from "../../enterprise/entities/post";
import { PostDetails } from "../../enterprise/entities/value-objects/post-with-details";
import { PostWithComments } from "../../enterprise/entities/value-objects/post-with-comments";

export interface PostRepository {
  save(post: Post): Promise<Post>;
  getById(id: string): Promise<Post | null>;
  getAll(params: PaginatedParams): Promise<Post[]>;
  update(post: Post): Promise<void>;
  delete(post: Post): Promise<void>;
  getPostsWithDetails(params: PaginatedParams): Promise<PostDetails[]>;
  getPostWithComments(id: string): Promise<PostWithComments | null>;
  getPostsWithDetailsByBlogger(bloggerId: string, params: PaginatedParams): Promise<PostDetails[]>;
  getLikedPostsWithDetailsByBlogger(bloggerId: string, params: PaginatedParams): Promise<PostDetails[]>;
}
