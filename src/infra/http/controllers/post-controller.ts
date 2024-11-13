import { ControllerBase } from "./interfaces/controller-base";
import { PostEntity } from "@/infra/database/typeorm/schemas/post";
import { PostRepository } from "@/domain/blog/app/repositories/post-repostitory";
import { CreatePostUseCase } from "@/domain/blog/app/use-cases/post/create-post-use-case";
import { PostTopicsRepository } from "@/domain/blog/app/repositories/post-topics-repository";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { UpdatePostUseCase } from "@/domain/blog/app/use-cases/post/update-post-use-case";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { DeletePostUseCase } from "@/domain/blog/app/use-cases/post/delete-post-use-case";
import { GetPostsUseCase } from "@/domain/blog/app/use-cases/post/get-posts-use-case";
import { PostControllerInterface } from "./interfaces/post-controller-interface";
import { PaginatedParams } from "@/core/params";

export class PostController
  implements ControllerBase<Post>, PostControllerInterface
{
  private readonly createPostUseCase: CreatePostUseCase;
  private readonly updatePostUseCase: UpdatePostUseCase;
  private readonly deletePostUseCase: DeletePostUseCase;
  private readonly getPostsUseCase: GetPostsUseCase;
  constructor(
    postRepository: PostRepository,
    postTopicsRepository: PostTopicsRepository,
    bloggerRepository: BloggerRepository
  ) {
    this.createPostUseCase = new CreatePostUseCase(
      postRepository,
      postTopicsRepository
    );
    this.updatePostUseCase = new UpdatePostUseCase(
      postRepository,
      bloggerRepository,
      postTopicsRepository
    );
    this.deletePostUseCase = new DeletePostUseCase(
      postRepository,
      bloggerRepository
    );
    this.getPostsUseCase = new GetPostsUseCase(postRepository);
  }
  async getPosts(params: PaginatedParams): Promise<Post[]> {
    const { posts } = await this.getPostsUseCase.execute({
      params,
    });

    return posts;
  }

  async create(data: Post): Promise<void> {
    await this.createPostUseCase.execute({
      authorId: data.authorId,
      bloggerCommunityId: data.bloggerCommunityId,
      content: data.content,
      title: data.title,
      topics: data.topics,
    });
  }

  async update(data: Post): Promise<void> {
    await this.updatePostUseCase.execute({
      id: data.id,
      content: data.content,
      title: data.title,
      authorId: data.authorId,
      topics: data.topics,
    });
  }
  async delete(id: string, bloggerId: string): Promise<void> {
    await this.deletePostUseCase.execute({
      bloggerId,
      id,
    });
  }
}
