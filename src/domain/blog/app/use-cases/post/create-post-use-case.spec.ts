import { InMemoryPostRepository } from "test/in-memory-repositories/in-memory-post-repository";
import { describe, expect, it } from "vitest";
import { CreatePostUseCase } from "./create-post-use-case";
import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import { Topic } from "@/domain/blog/enterprise/entities/topic";

describe("create post", () => {
  it("should be able to create a post without bloggers community", () => {
    const repository = new InMemoryPostRepository();
    const useCase = new CreatePostUseCase(repository);

    useCase.execute({
      authorId: "author-id",
      bloggersCommunityId: null,
      content: "teste",
      title: "Teste",
      topics: [],
    });

    expect(repository.posts).toHaveLength(1);
  });

  it("should be able to create a post on bloggers community", async () => {
    const repository = new InMemoryPostRepository();
    const useCase = new CreatePostUseCase(repository);

    const bloggersCommunity = BloggersCommunity.create({
      authorId: "author-id",
      avatarUrl: null,
      description: "community description",
      name: "community name",
      slug: "community-slug",
    });

    const { post } = await useCase.execute({
      authorId: "author-id",
      bloggersCommunityId: bloggersCommunity.id,
      content: "teste",
      title: "Teste",
      topics: [],
    });

    expect(repository.posts).toHaveLength(1);
    expect(post.bloggersCommunityId).toEqual(post.bloggersCommunityId);
  });

  it("should be able to create a post with topics", async () => {
    const repository = new InMemoryPostRepository();
    const useCase = new CreatePostUseCase(repository);

    const topic = Topic.create({
      name: "topic name",
      slug: "topic-name",
    });

    const { post } = await useCase.execute({
      authorId: "author-id",
      bloggersCommunityId: null,
      content: "teste",
      title: "Teste",

      topics: [topic.slug],
    });

    expect(repository.posts).toHaveLength(1);
    expect(post.topics).toEqual([topic.slug]);
  });
});
