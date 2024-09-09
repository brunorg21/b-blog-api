import { InMemoryPostRepository } from "test/in-memory-repositories/in-memory-post-repository";
import { describe, expect, it } from "vitest";
import { UpdatePostUseCase } from "./update-post-use-case";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { InMemoryBloggerRepository } from "test/in-memory-repositories/in-memory-blogger-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";
import { Blogger } from "@/domain/blog/enterprise/entities/blogger";

describe("update post", () => {
  it("should be able to update a post", async () => {
    const repository = new InMemoryPostRepository();
    const bloggersRepository = new InMemoryBloggerRepository();
    const useCase = new UpdatePostUseCase(repository, bloggersRepository);

    const user = Blogger.create({
      avatarUrl: null,
      bloggersCommunityId: null,
      createdAt: new Date(),
      email: "user-email",
      name: "user",
      password: "123456",
      role: "COMMON",
    });

    await bloggersRepository.save(user);

    const post = Post.create({
      authorId: user.id,
      bloggersCommunityId: null,
      content: "teste",
      title: "Teste",
      topics: [],
    });

    await repository.save(post);

    await useCase.execute({
      id: post.id,
      content: "new content",
      title: "new title",
      topics: ["topic 1"],
      authorId: user.id,
    });

    expect(repository.posts[0].content).toEqual("new content");
  });

  it("should not be able to update a post with invalid id", async () => {
    const repository = new InMemoryPostRepository();
    const bloggersRepository = new InMemoryBloggerRepository();
    const useCase = new UpdatePostUseCase(repository, bloggersRepository);

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
          authorId: "author-id",
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to update a post you don't own", async () => {
    const repository = new InMemoryPostRepository();
    const bloggersRepository = new InMemoryBloggerRepository();
    const useCase = new UpdatePostUseCase(repository, bloggersRepository);

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
          id: post.id,
          content: "new content",
          title: "new title",
          topics: ["topic 1"],
          authorId: "author-id2",
        })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });
});
