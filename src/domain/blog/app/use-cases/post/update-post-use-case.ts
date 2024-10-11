import { BloggerRepository } from "../../repositories/blogger-repository";
import { PostRepository } from "../../repositories/post-repostitory";
import { PostTopicsRepository } from "../../repositories/post-topics-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface UpdatePostUseCaseRequest {
  id: string;
  title: string;
  content: string;

  authorId: string;
}

export class UpdatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly bloggerRepository: BloggerRepository,
    private readonly postTopicRepository: PostTopicsRepository
  ) {}
  async execute({
    id,
    content,
    title,

    authorId,
  }: UpdatePostUseCaseRequest): Promise<void> {
    const post = await this.postRepository.getById(id);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    const blogger = await this.bloggerRepository.getById(authorId);

    if (blogger?.role !== "ADMIN" && post.authorId !== blogger?.id) {
      throw new NotAllowedError();
    }

    post.content = content;
    post.title = title;

    await this.postRepository.update(post);
  }
}
