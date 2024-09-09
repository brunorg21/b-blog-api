import { InMemoryPostRepository } from "test/in-memory-repositories/in-memory-post-repository";
import { describe, expect, it } from "vitest";
import { DeletePostUseCase } from "./delete-post-use-case";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { InMemoryBloggerRepository } from "test/in-memory-repositories/in-memory-blogger-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";

describe("delete post", () => {
  it("should be able to delete a post", async () => {
    const repository = new InMemoryPostRepository();
    const bloggerRepository = new InMemoryBloggerRepository();
    const useCase = new DeletePostUseCase(repository, bloggerRepository);

    const user = Blogger.create({
      avatarUrl: null,
      bloggersCommunityId: null,
      createdAt: new Date(),
      email: "user-email",
      name: "user",
      password: "123456",
      role: "COMMON",
    });

    await bloggerRepository.save(user);

    const post = Post.create({
      authorId: user.id,
      bloggersCommunityId: null,
      content: "test",
      title: "test",
      topics: [],
    });

    await repository.save(post);

    await useCase.execute({
      id: post.id,
      authorId: user.id,
    });

    expect(repository.posts).toHaveLength(0);
  });

  it("should not be able to delete a post with invalid id", async () => {
    const repository = new InMemoryPostRepository();
    const bloggerRepository = new InMemoryBloggerRepository();
    const useCase = new DeletePostUseCase(repository, bloggerRepository);

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
          authorId: post.authorId,
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to delete a post you don't own", async () => {
    const repository = new InMemoryPostRepository();
    const bloggerRepository = new InMemoryBloggerRepository();
    const useCase = new DeletePostUseCase(repository, bloggerRepository);

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
          authorId: "blogger-id",
        })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });

  it("should be able to delete a post when you are an admin", async () => {
    const repository = new InMemoryPostRepository();
    const bloggerRepository = new InMemoryBloggerRepository();
    const useCase = new DeletePostUseCase(repository, bloggerRepository);

    const user = Blogger.create({
      avatarUrl: null,
      bloggersCommunityId: null,
      createdAt: new Date(),
      email: "admin@email.com",
      name: "admin",
      password: "admin",
      role: "ADMIN",
    });

    await bloggerRepository.save(user);

    const post = Post.create({
      authorId: "author-id",
      bloggersCommunityId: null,
      content: "teste",
      title: "Teste",
      topics: [],
    });

    await repository.save(post);

    await useCase.execute({
      id: post.id,
      authorId: user.id,
    });

    expect(repository.posts).toHaveLength(0);
  });
});
