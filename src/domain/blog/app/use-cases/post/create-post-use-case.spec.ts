import { Post } from "@/domain/blog/enterprise/entities/post";
import { InMemoryPostRepository } from "test/in-memory-repositories/in-memory-post-repository";
import { describe, expect, it } from "vitest";
import { CreatePostUseCase } from "./create-post-use-case";

describe("create post", () => {
  it("should be able to create a post", () => {
    const repository = new InMemoryPostRepository();
    const useCase = new CreatePostUseCase(repository);
    const post = Post.create({
      authorId: "author-id",
      bloggersCommunityId: "community-id",
      content: "teste",
      title: "Teste",
      attachments: [],
      topics: [],
    });

    useCase.execute(post);

    expect(repository.posts).toHaveLength(1);
  });
});
