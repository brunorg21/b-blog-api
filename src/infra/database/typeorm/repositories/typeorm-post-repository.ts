import { appDataSource } from "..";
import { Repository } from "typeorm";
import { PostEntity } from "../schemas/post";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { ToTypeormPostMapper } from "../mappers/toTypeormPostMapper";
import { PostRepository } from "@/domain/blog/app/repositories/post-repostitory";
import { PaginatedParams } from "@/core/params";
import { ToTypeormPostDetailsMapper } from "../mappers/toTypeormPostDetailsMapper";
import { PostDetails } from "@/domain/blog/enterprise/entities/value-objects/post-with-details";
import { PostWithComments } from "@/domain/blog/enterprise/entities/value-objects/post-with-comments";
import { ToTypeormPostWithCommentsMapper } from "../mappers/toTypeormPostWithCommentsMapper";

export class TypeormPostRepository implements PostRepository {
  private readonly typeormPostRepository: Repository<PostEntity>;

  constructor() {
    this.typeormPostRepository = appDataSource.getRepository(PostEntity);
  }
  async getPostsWithDetailsByBlogger(
    bloggerId: string,
    { page }: PaginatedParams
  ): Promise<PostDetails[]> {
    const posts = await this.typeormPostRepository.find({
      where: {
        authorId: bloggerId,
      },
      order: {
        createdAt: "ASC",
      },
      skip: (page - 1) * 10,
      take: 10,
      relations: {
        author: true,
        comments: {
          author: true,
        },
        bloggerCommunity: true,
        postTopics: {
          topic: true,
        },
      },
    });

    return posts.map((post) => ToTypeormPostDetailsMapper.toDomain(post));
  }
  async getLikedPostsWithDetailsByBlogger(
    bloggerId: string,
    { page }: PaginatedParams
  ): Promise<PostDetails[]> {
    const posts = await this.typeormPostRepository.find({
      where: {
        likes: {
          bloggerId,
        },
      },
      order: {
        createdAt: "ASC",
      },
      skip: (page - 1) * 10,
      take: 10,
      relations: {
        author: true,
        comments: {
          author: true,
        },
        bloggerCommunity: true,
        postTopics: {
          topic: true,
        },
      },
    });

    return posts.map((post) => ToTypeormPostDetailsMapper.toDomain(post));
  }
  async getPostWithComments(id: string): Promise<PostWithComments | null> {
    const post = await this.typeormPostRepository.findOne({
      where: {
        id,
      },
      relations: {
        bloggerCommunity: true,
        author: true,
        comments: {
          author: true,
        },
        postTopics: {
          topic: true,
        },
      },
    });

    if (!post) {
      return null;
    }

    return ToTypeormPostWithCommentsMapper.toDomain(post);
  }
  async getPostsWithDetails({
    page,
    query,
  }: PaginatedParams): Promise<PostDetails[]> {
    const posts = await this.typeormPostRepository.find({
      where: {
        postTopics: {
          topic: {
            slug: query,
          },
        },
      },
      order: {
        createdAt: "ASC",
      },
      skip: (page - 1) * 10,
      take: 10,
      relations: {
        author: true,
        comments: {
          author: true,
        },
        bloggerCommunity: true,
        postTopics: {
          topic: true,
        },
      },
    });

    return posts.map((post) => ToTypeormPostDetailsMapper.toDomain(post));
  }

  async getAll(params: PaginatedParams): Promise<Post[]> {
    const posts = await this.typeormPostRepository.find();

    return posts.map((post) => ToTypeormPostMapper.toDomain(post));
  }

  async save(post: Post): Promise<Post> {
    const typeormPost = ToTypeormPostMapper.toPostEntity(post);

    const newPost = await this.typeormPostRepository.save(typeormPost);

    return Post.create(
      {
        authorId: newPost.authorId,
        bloggerCommunityId: newPost.bloggerCommunityId,
        content: newPost.content,
        likeCount: newPost.likeCount,
        title: newPost.title,
        topics: newPost.postTopics?.map((e) => e.topicId) ?? [],
      },
      newPost.id
    );
  }
  async getById(id: string): Promise<Post | null> {
    const post = await this.typeormPostRepository.findOneBy({
      id,
    });

    if (!post) {
      return null;
    }

    return ToTypeormPostMapper.toDomain(post);
  }

  async update(post: Post): Promise<void> {
    await this.typeormPostRepository.update(post.id, {
      content: post.content,
      bloggerCommunityId: post.bloggerCommunityId,
      authorId: post.authorId,
      likeCount: post.likeCount,
      title: post.title,
    });
  }

  async delete(post: Post): Promise<void> {
    await this.typeormPostRepository.remove(post);
  }
}
