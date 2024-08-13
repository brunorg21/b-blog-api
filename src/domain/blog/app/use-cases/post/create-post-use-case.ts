import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostRepository } from "../../repositories/post-repostitory";

export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute(post: Post): Promise<void> {
    await this.postRepository.save(post);
  }
}
