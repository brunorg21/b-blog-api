import { BloggerCommunityWithPosts } from "@/domain/blog/enterprise/entities/value-objects/blogger-community-with-posts";
import { PostDetailsPresenter } from "./post-details-presenter";

export class BloggersCommunityWithPostsPresenter {
  static toHTTP(bloggerCommunity: BloggerCommunityWithPosts) {
    return {
      id: bloggerCommunity.bloggerCommunityId,
      name: bloggerCommunity.name,
      authorId: bloggerCommunity.authorId,
      description: bloggerCommunity.description,
      slug: bloggerCommunity.slug,
      avatarUrl: bloggerCommunity?.avatarUrl ?? null,
      createdAt: bloggerCommunity.createdAt,
      updatedAt: bloggerCommunity.updatedAt,
      posts: bloggerCommunity.posts?.map(PostDetailsPresenter.toHTTP) ?? [],
      author: bloggerCommunity.author,
    };
  }
}
