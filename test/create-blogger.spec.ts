import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { describe, expect, it } from "vitest";

describe("create blogger", () => {
  it("should be able to create a blogger", () => {
    const blogger = Blogger.create({
      avatarUrl: null,
      bloggersCommunityId: null,
      email: "blogger@example.com",
      name: "blogger-name",
      password: "blogger-password",
    });

    expect(blogger.id).toEqual(expect.any(String));
  });
});
