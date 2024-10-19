import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostRepository } from "../../repositories/post-repostitory";
import { PostTopicsRepository } from "../../repositories/post-topics-repository";
import { PostTopic } from "@/domain/blog/enterprise/entities/topic-post";

interface CreatePostUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
  bloggerCommunityId: string | null;
  topics: string[];
}

interface CreatePostUseCaseResponse {
  post: Post;
}

export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postTopicsRepository: PostTopicsRepository
  ) {}
  async execute(
    post: CreatePostUseCaseRequest
  ): Promise<CreatePostUseCaseResponse> {
    const newPost = Post.create({
      authorId: post.authorId,
      bloggerCommunityId: post.bloggerCommunityId,
      content: post.content,
      title: post.title,
      likeCount: 0,
    });

    await this.postRepository.save(newPost);

    if (post.topics.length > 0) {
      for (const topic of post.topics) {
        await this.postTopicsRepository.save(
          PostTopic.create({
            postId: newPost.id,
            topicId: topic,
          })
        );
      }
    }

    return { post: newPost };
  }
}
