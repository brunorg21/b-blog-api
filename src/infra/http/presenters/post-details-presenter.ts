import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";

export class PostDetailsPresenter {
  static toHTTP(post: PostDetails) {
    return {
      id: post.postId,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      likeCount: post.likeCount,
      bloggerCommunity: post.bloggerCommunity,
      postTopics: post.postTopics,
      author: post.author
    };
  }
}