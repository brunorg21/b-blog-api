import { Post } from "@/domain/blog/enterprise/entities/post";
import { describe, expect, it } from "vitest";

describe("create post", () => {
  it("should be able to create a post", () => {
    const post = Post.create({
      authorId: "author-id",
      bloggersCommunityId: "community-id",
      content: "teste",
      title: "Teste",
      attachments: [],
    });

    expect(post.title).toBe("Teste");
  });
});
