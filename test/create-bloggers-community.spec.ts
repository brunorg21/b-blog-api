import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { describe, expect, it } from "vitest";

describe("create community", () => {
  it("should be able to create a bloggers community", () => {
    const community = BloggersCommunity.create({
      avatarUrl: null,
      description: "teste",
      name: "community-name",
      slug: "community-name",
      authorId: "author-id",
    });

    expect(community.id).toEqual(expect.any(String));
  });
});
