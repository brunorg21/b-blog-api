import { PostWithComments } from "@/domain/blog/enterprise/entities/value-objects/post-with-comments";
import { TopicPresenter } from "./topic-presenter";
import { CommentDetailsPresenter } from "./comment-details-presenter";
import { BloggersCommunityPresenter } from "./bloggers-community-presenter";

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
      bloggerCommunity: post.bloggerCommunity
        ? BloggersCommunityPresenter.toHTTP(post.bloggerCommunity)
        : null,
      postTopics: post.postTopics.map(TopicPresenter.toHTTP),
      author: post.author,
      comments: post.comments.map(CommentDetailsPresenter.toHTTP),
    };
  }
}
