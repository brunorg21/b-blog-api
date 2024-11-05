import { CommunityBlogger } from "@/domain/blog/enterprise/entities/community-blogger";
import { CommunityBloggerEntity } from "../schemas/community-blogger";

export class ToTypeormCommunityBloggerMapper {
  static toCommunityBloggerEntity(
    communityBlogger: CommunityBlogger
  ): CommunityBloggerEntity {
    return {
      id: communityBlogger.id,
      bloggerId: communityBlogger.bloggerId,
      bloggerCommunityId: communityBlogger.bloggerCommunityId,
    };
  }

  static toDomain(communityBlogger: CommunityBloggerEntity): CommunityBlogger {
    return CommunityBlogger.create(
      {
        bloggerCommunityId: communityBlogger.bloggerCommunityId,
        bloggerId: communityBlogger.bloggerId,
      },
      communityBlogger.id
    );
  }
}
