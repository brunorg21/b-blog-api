import { PostRepository } from "../../repositories/post-repostitory";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface UpdatePostUseCaseRequest {
  id: string;
  title: string;
  content: string;
  topics: string[];
}

export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute({
    id,
    content,
    title,
    topics,
  }: UpdatePostUseCaseRequest): Promise<void> {
    const post = await this.postRepository.getById(id);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    post.content = content;
    post.title = title;
    post.topics = topics;

    await this.postRepository.update(post);
  }
}
