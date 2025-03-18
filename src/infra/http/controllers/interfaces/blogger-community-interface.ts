import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggerCommunityWithPosts } from "@/domain/blog/enterprise/entities/value-objects/blogger-community-with-posts";

export interface UpdateBloggersCommunityRequest {
  id: string;
  name: string;
  description: string;
}

export interface BloggerCommunityControllerInterface {
  getBloggerCommunitiesByAuthor(
    bloggerId: string
  ): Promise<BloggersCommunity[]>;
  getAllBloggersCommunity(bloggerId: string): Promise<BloggersCommunity[]>;
  updateBloggerCommunity(
    data: UpdateBloggersCommunityRequest,
    bloggerId: string
  ): void;
  getBySlug(slug: string): Promise<BloggerCommunityWithPosts>;
  getBloggerCommunitiesByBlogger(
    bloggerId: string
  ): Promise<BloggersCommunity[]>;
}
