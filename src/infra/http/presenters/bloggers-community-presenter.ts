import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";



export class BloggersCommunityPresenter {
  static toHTTP(bloggerCommunity: BloggersCommunity) {
    return {
      id: bloggerCommunity.id,
      name: bloggerCommunity.name,
      authorId: bloggerCommunity.authorId,
      description: bloggerCommunity.description,
      slug: bloggerCommunity.slug,
      avatarUrl: bloggerCommunity?.avatarUrl ?? null,
      createdAt: bloggerCommunity.createdAt,
      updatedAt: bloggerCommunity.updatedAt
    };
  }
}