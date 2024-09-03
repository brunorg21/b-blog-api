import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostRepository } from "../../repositories/post-repostitory";

interface CreatePostUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
  bloggersCommunityId: string | null;
  topics: string[];
}

interface CreatePostUseCaseResponse {
  post: Post;
}

export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute(
    post: CreatePostUseCaseRequest
  ): Promise<CreatePostUseCaseResponse> {
    const newPost = Post.create({
      authorId: post.authorId,
      bloggersCommunityId: post.bloggersCommunityId,
      content: post.content,
      title: post.title,
      topics: post.topics,
    });

    await this.postRepository.save(newPost);

    return { post: newPost };
  }
}
