import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { describe, expect, it } from "vitest";

describe("create post comment on post", () => {
  it("should be able to create a post comment in a post", () => {
    const post = Post.create({
      authorId: "author-id",
      bloggersCommunityId: "community-id",
      content: "teste",
      title: "Teste",
      attachments: [],
    });

    const postComment = PostComment.create({
      authorId: "user-id",
      content: "comment",
      postId: post._id,
    });

    expect(postComment.postId).toBe(post._id);
  });
});
