import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { BloggerCommunityEntity } from "../schemas/blogger-community";
import { BloggerCommunityWithPosts } from "@/domain/blog/enterprise/entities/value-objects/blogger-community-with-posts";
import { ToTypeormPostDetailsMapper } from "./toTypeormPostDetailsMapper";

export class ToTypeormBloggerCommunityWithPostsMapper {
  static toBloggerCommunityEntity(
    bloggerCommunity: BloggersCommunity
  ): BloggerCommunityEntity {
    return {
      authorId: bloggerCommunity.authorId,
      avatarUrl: bloggerCommunity.avatarUrl,
      description: bloggerCommunity.description,
      id: bloggerCommunity.id,
      name: bloggerCommunity.name,
      slug: bloggerCommunity.slug,
      createdAt: bloggerCommunity.createdAt,
      updatedAt: bloggerCommunity.updatedAt ?? null,
    };
  }

  static toDomain(
    bloggerCommunityEntity: BloggerCommunityEntity
  ): BloggerCommunityWithPosts {
    return BloggerCommunityWithPosts.create({
      authorId: bloggerCommunityEntity.authorId,
      avatarUrl: bloggerCommunityEntity.avatarUrl,
      bloggerCommunityId: bloggerCommunityEntity.id,
      description: bloggerCommunityEntity.description,
      name: bloggerCommunityEntity.name,
      posts:
        bloggerCommunityEntity.posts?.map(
          ToTypeormPostDetailsMapper.toDomain
        ) ?? [],
      slug: bloggerCommunityEntity.slug,
      createdAt: bloggerCommunityEntity.createdAt!,
      updatedAt: bloggerCommunityEntity.updatedAt,
      author: bloggerCommunityEntity.author?.name ?? "",
    });
  }
}
