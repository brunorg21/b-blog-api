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

export interface LikePostProps {
  bloggerId: string;
  postId: string;
}

export interface PostControllerInterface {
  getPosts(params: PaginatedParams): Promise<Post[]>;
  getPostsDetails(params: PaginatedParams): Promise<PostDetails[]>;
  getLikedPostsWithDetailsByBlogger(
    params: PaginatedParams,
    bloggerId: string
  ): Promise<PostDetails[]>;
  getPostsWithDetailsByBlogger(
    params: PaginatedParams,
    bloggerId: string
  ): Promise<PostDetails[]>;
  getPostWithComments(id: string): Promise<PostWithComments>;
  updatePost(props: UpdatePostProps): Promise<void>;
  likePost(props: LikePostProps): Promise<void>;
  removeLikePost(props: LikePostProps): Promise<void>;
  verifyLikedPost(bloggerId: string, postId: string): Promise<boolean>;
}
