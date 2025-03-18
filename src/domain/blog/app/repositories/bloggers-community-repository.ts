import { BloggersCommunity } from "../../enterprise/entities/bloggers-community";
import { BloggerCommunityWithPosts } from "../../enterprise/entities/value-objects/blogger-community-with-posts";

export interface BloggersCommunityRepository {
  save(bloggersCommunity: BloggersCommunity): Promise<BloggersCommunity>;
  getById(bloggerCommunityId: string): Promise<BloggersCommunity | null>;
  update(bloggersCommunity: BloggersCommunity): Promise<void>;
  delete(bloggersCommunity: BloggersCommunity): Promise<void>;
  getAllByAuthorId(bloggerId: string): Promise<BloggersCommunity[]>;
  getAll(): Promise<BloggersCommunity[]>;
  getBySlug(slug: string): Promise<BloggerCommunityWithPosts | null>;
  getByIds(bloggerCommunityIds: string[]): Promise<BloggersCommunity[]>;
}
