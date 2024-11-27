import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggerCommunityEntity } from "../schemas/blogger-community";

export class ToTypeormBloggerCommunityMapper {
  static toBloggerCommunityEntity(
    bloggerCommunity: BloggersCommunity
  ): BloggerCommunityEntity {
    return {
      id: bloggerCommunity.id,
      name: bloggerCommunity.name,
      authorId: bloggerCommunity.authorId,
      description: bloggerCommunity.description,
      slug: bloggerCommunity.slug,
      avatarUrl: bloggerCommunity?.avatarUrl ?? null,
      createdAt: bloggerCommunity.createdAt,
      updatedAt: bloggerCommunity.updatedAt,
    };
  }

  static toDomain(
    bloggerCommunityEntity: BloggerCommunityEntity
  ): BloggersCommunity {
    return BloggersCommunity.create(
      {
        avatarUrl: bloggerCommunityEntity.avatarUrl,
        authorId: bloggerCommunityEntity.authorId,
        description: bloggerCommunityEntity.description,
        name: bloggerCommunityEntity.name,
        slug: bloggerCommunityEntity.slug,
      },
      bloggerCommunityEntity.id
    );
  }
}
