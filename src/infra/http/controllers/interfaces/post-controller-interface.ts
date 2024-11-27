import { PaginatedParams } from "@/core/params";

import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostWithComments } from "@/domain/blog/enterprise/entities/value-objects/post-with-comments";
import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";

export interface UpdatePostProps {
  content: string;
  title: string;
  bloggerId: string;
  id: string;
  topics: string[];
}

export interface PostControllerInterface {
  getPosts(params: PaginatedParams): Promise<Post[]>;
  getPostsDetails(params: PaginatedParams): Promise<PostDetails[]>;
  getPostWithComments(id: string): Promise<PostWithComments>;
  updatePost(props: UpdatePostProps): Promise<void>;
}
