import { CommunityBlogger } from "../../enterprise/entities/community-blogger";

export interface CommunityBloggerRepository {
  save(communityBlogger: CommunityBlogger): Promise<void>;
  getAllByBloggerId(bloggerId: string): Promise<CommunityBlogger[]>;
}
