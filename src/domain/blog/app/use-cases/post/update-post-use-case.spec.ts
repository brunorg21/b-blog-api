import { InMemoryPostRepository } from "test/in-memory-repositories/in-memory-post-repository";
import { describe, expect, it } from "vitest";
import { UpdatePostUseCase } from "./update-post-use-case";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

describe("update post", () => {
  it("should be able to update a post", async () => {
    const repository = new InMemoryPostRepository();
    const useCase = new UpdatePostUseCase(repository);

    const post = Post.create({
      authorId: "author-id",
      bloggersCommunityId: null,
      content: "teste",
      title: "Teste",
      topics: [],
    });

    await repository.save(post);

    await useCase.execute({
      id: post._id,
      content: "new content",
      title: "new title",
      topics: ["topic 1"],
    });

    expect(repository.posts[0].content).toEqual("new content");
  });

  it("should not be able to update a post with invalid id", async () => {
    const repository = new InMemoryPostRepository();
    const useCase = new UpdatePostUseCase(repository);

    const post = Post.create({
      authorId: "author-id",
      bloggersCommunityId: null,
      content: "teste",
      title: "Teste",
      topics: [],
    });

    await repository.save(post);

    expect(
      async () =>
        await useCase.execute({
          id: "invalid-id",
          content: "new content",
          title: "new title",
          topics: ["topic 1"],
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
