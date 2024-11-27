import { PostWithComments } from "@/domain/blog/enterprise/entities/value-objects/post-with-comments";


export class PostWithCommentsPresenter {
  static toHTTP(post: PostWithComments) {
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
      author: post.author,
      comments: post.comments
    };
  }
}