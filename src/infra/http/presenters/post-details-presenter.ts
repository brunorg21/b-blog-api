import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";
import { TopicPresenter } from "./topic-presenter";
import { BloggersCommunityPresenter } from "./bloggers-community-presenter";

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
      bloggerCommunity: post.bloggerCommunity
        ? BloggersCommunityPresenter.toHTTP(post.bloggerCommunity)
        : null,
      postTopics: post?.topics?.map(TopicPresenter.toHTTP),
      author: post.author,
    };
  }
}
