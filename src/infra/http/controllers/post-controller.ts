import { ControllerBase } from "./interfaces/controller-base";
import { PostRepository } from "@/domain/blog/app/repositories/post-repostitory";
import { CreatePostUseCase } from "@/domain/blog/app/use-cases/post/create-post-use-case";
import { PostTopicsRepository } from "@/domain/blog/app/repositories/post-topics-repository";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { UpdatePostUseCase } from "@/domain/blog/app/use-cases/post/update-post-use-case";
import { BloggerRepository } from "@/domain/blog/app/repositories/blogger-repository";
import { DeletePostUseCase } from "@/domain/blog/app/use-cases/post/delete-post-use-case";
import { GetPostsUseCase } from "@/domain/blog/app/use-cases/post/get-posts-use-case";
import {
  LikePostProps,
  PostControllerInterface,
  UpdatePostProps,
} from "./interfaces/post-controller-interface";
import { PaginatedParams } from "@/core/params";
import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";
import { GetPostsWithDetailsUseCase } from "@/domain/blog/app/use-cases/post/get-posts-with-details-use-case";
import { GetPostWithCommentsUseCase } from "@/domain/blog/app/use-cases/post/get-post-with-comments-use-case";
import { PostWithComments } from "@/domain/blog/enterprise/entities/value-objects/post-with-comments";
import { LikePostUseCase } from "@/domain/blog/app/use-cases/post/like-post-use-case";
import { PostLikeRepository } from "@/domain/blog/app/repositories/post-like-repository";
import { RemoveLikePostUseCase } from "@/domain/blog/app/use-cases/post/remove-like-post-use-case";
import { GetLikedPostsWithDetailsByBloggerUseCase } from "@/domain/blog/app/use-cases/post/get-liked-posts-with-details-by-blogger-use-case";
import { GetPostWithDetailsByBloggerUseCase } from "@/domain/blog/app/use-cases/post/get-posts-with-details-by-blogger-use-case";
import { VerifyLikedPostUseCase } from "@/domain/blog/app/use-cases/post/verify-liked-post-use-case";

export class PostController
  implements ControllerBase<Post>, PostControllerInterface
{
  private readonly createPostUseCase: CreatePostUseCase;
  private readonly updatePostUseCase: UpdatePostUseCase;
  private readonly deletePostUseCase: DeletePostUseCase;
  private readonly getLikedPostsWithDetailsByBloggerUseCase: GetLikedPostsWithDetailsByBloggerUseCase;
  private readonly getPostsWithDetailsByBloggerUseCase: GetPostWithDetailsByBloggerUseCase;
  private readonly getPostsUseCase: GetPostsUseCase;
  private readonly getPostsWithDetailsUseCase: GetPostsWithDetailsUseCase;
  private readonly getPostWithCommentsUseCase: GetPostWithCommentsUseCase;
  private readonly likePostUseCase: LikePostUseCase;
  private readonly removeLikePostUseCase: RemoveLikePostUseCase;
  private readonly verifyLikedPostUseCase: VerifyLikedPostUseCase;
  constructor(
    postRepository: PostRepository,
    postTopicsRepository: PostTopicsRepository,
    bloggerRepository: BloggerRepository,
    postLikeRepository: PostLikeRepository
  ) {
    this.createPostUseCase = new CreatePostUseCase(
      postRepository,
      postTopicsRepository
    );
    this.getLikedPostsWithDetailsByBloggerUseCase =
      new GetLikedPostsWithDetailsByBloggerUseCase(postRepository);
    this.getPostsWithDetailsByBloggerUseCase =
      new GetPostWithDetailsByBloggerUseCase(postRepository);
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
    this.getPostsWithDetailsUseCase = new GetPostsWithDetailsUseCase(
      postRepository
    );
    this.getPostWithCommentsUseCase = new GetPostWithCommentsUseCase(
      postRepository
    );
    this.likePostUseCase = new LikePostUseCase(
      postRepository,
      postLikeRepository
    );

    this.removeLikePostUseCase = new RemoveLikePostUseCase(
      postRepository,
      postLikeRepository
    );
    this.verifyLikedPostUseCase = new VerifyLikedPostUseCase(postRepository);
  }
  async verifyLikedPost(bloggerId: string, postId: string): Promise<boolean> {
    const { hasLiked } = await this.verifyLikedPostUseCase.execute({
      bloggerId,
      postId,
    });

    return hasLiked;
  }
  async getLikedPostsWithDetailsByBlogger(
    params: PaginatedParams,
    bloggerId: string
  ): Promise<PostDetails[]> {
    const { posts } =
      await this.getLikedPostsWithDetailsByBloggerUseCase.execute({
        params,
        bloggerId,
      });

    return posts;
  }
  async getPostsWithDetailsByBlogger(
    params: PaginatedParams,
    bloggerId: string
  ): Promise<PostDetails[]> {
    const { posts } = await this.getPostsWithDetailsByBloggerUseCase.execute({
      params,
      bloggerId,
    });

    return posts;
  }

  async getPostWithComments(id: string): Promise<PostWithComments> {
    const { postWithComments } = await this.getPostWithCommentsUseCase.execute({
      id,
    });

    return postWithComments;
  }
  async updatePost({
    bloggerId,
    content,
    id,
    title,
    topics,
  }: UpdatePostProps): Promise<void> {
    await this.updatePostUseCase.execute({
      bloggerId,
      content,
      id,
      title,
      topics,
    });
  }

  async getPostsDetails(params: PaginatedParams): Promise<PostDetails[]> {
    const { posts } = await this.getPostsWithDetailsUseCase.execute({
      params,
    });

    return posts;
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
      bloggerId: data.authorId,
      topics: data.topics,
    });
  }
  async delete(id: string, bloggerId: string): Promise<void> {
    await this.deletePostUseCase.execute({
      bloggerId,
      id,
    });
  }

  async likePost({ bloggerId, postId }: LikePostProps): Promise<void> {
    await this.likePostUseCase.execute({
      bloggerId,
      postId,
    });
  }

  async removeLikePost({ bloggerId, postId }: LikePostProps): Promise<void> {
    await this.removeLikePostUseCase.execute({
      bloggerId,
      postId,
    });
  }
}
