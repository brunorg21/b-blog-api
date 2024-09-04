import { InMemoryPostRepository } from "test/in-memory-repositories/in-memory-post-repository";
import { describe, expect, it } from "vitest";
import { DeletePostUseCase } from "./delete-post-use-case";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

describe("delete post", () => {
  it("should be able to delete a post", async () => {
    const repository = new InMemoryPostRepository();
    const useCase = new DeletePostUseCase(repository);

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
    });

    expect(repository.posts).toHaveLength(0);
  });

  it("should not be able to delete a post with invalid id", async () => {
    const repository = new InMemoryPostRepository();
    const useCase = new DeletePostUseCase(repository);

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
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
