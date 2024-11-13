import { PaginatedParams } from "@/core/params";

import { Post } from "@/domain/blog/enterprise/entities/post";

export interface PostControllerInterface {
  getPosts(params: PaginatedParams): Promise<Post[]>;
}
