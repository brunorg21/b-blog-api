import { InMemoryPostRepository } from "test/in-memory-repositories/in-memory-post-repository";
import { describe, expect, it } from "vitest";
import { GetUniquePostUseCase } from "./get-unique-post-use-case";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

describe("get unique post", () => {
  it("should be able to get unique a post", async () => {
    const repository = new InMemoryPostRepository();
    const useCase = new GetUniquePostUseCase(repository);

    const newPost = Post.create({
      authorId: "author-id",
      bloggersCommunityId: null,
      content: "teste",
      title: "Teste",
      topics: [],
    });

    await repository.save(newPost);

    const { post } = await useCase.execute({
      id: newPost.id,
    });

    expect(repository.posts).toHaveLength(1);
    expect(post.id).toEqual(expect.any(String));
  });

  it("should not be able to get unique a post with invalid id", async () => {
    const repository = new InMemoryPostRepository();
    const useCase = new GetUniquePostUseCase(repository);

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
