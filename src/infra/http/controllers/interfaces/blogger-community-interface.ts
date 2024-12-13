import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";

export interface UpdateBloggersCommunityRequest {
  id: string;
  name: string;
  description: string;
}

export interface BloggerCommunityControllerInterface {
  getBloggerCommunitiesByAuthor(
    bloggerId: string
  ): Promise<BloggersCommunity[]>;
  getUniqueBloggersCommunity(id: string): Promise<BloggersCommunity>;
  getAllBloggersCommunity(bloggerId: string): Promise<BloggersCommunity[]>;
  updateBloggerCommunity(
    data: UpdateBloggersCommunityRequest,
    bloggerId: string
  ): void;
  getBySlug(slug: string): Promise<BloggersCommunity>;
}
