import { BloggersCommunity } from "../../enterprise/entities/bloggers-community";

export interface BloggersCommunityRepository {
  save(bloggersCommunity: BloggersCommunity): Promise<void>;
  getById(bloggerId: string): Promise<BloggersCommunity | null>;
  update(bloggersCommunity: BloggersCommunity): Promise<void>;
  delete(bloggersCommunity: BloggersCommunity): Promise<void>;
  getAllByBloggerId(bloggerId: string): Promise<BloggersCommunity[]>;
}
