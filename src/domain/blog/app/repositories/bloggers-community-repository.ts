import { BloggersCommunity } from "../../enterprise/entities/bloggers-community";

export interface BloggersCommunityRepository {
  save(bloggersCommunity: BloggersCommunity): Promise<void>;
  getById(bloggerCommunityId: string): Promise<BloggersCommunity | null>;
  update(bloggersCommunity: BloggersCommunity): Promise<void>;
  delete(bloggersCommunity: BloggersCommunity): Promise<void>;
  getAllByAuthorId(bloggerId: string): Promise<BloggersCommunity[]>;
  getAll(): Promise<BloggersCommunity[]>;
  getBySlug(slug: string): Promise<BloggersCommunity | null>;
}
