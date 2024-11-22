import { PostTopic } from "@/domain/blog/enterprise/entities/topic-post";
import { BloggerRepository } from "../../repositories/blogger-repository";
import { PostRepository } from "../../repositories/post-repostitory";
import { PostTopicsRepository } from "../../repositories/post-topics-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

interface UpdatePostUseCaseRequest {
  id: string;
  title: string;
  content: string;
  topics: string[];
  bloggerId: string;
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
    bloggerId,
    topics,
  }: UpdatePostUseCaseRequest): Promise<void> {
    const post = await this.postRepository.getById(id);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    if (topics.length > 0) {
      const topicsExists = await this.postTopicRepository.getByPostId(post.id);

      const topicsToBeDeleted = topicsExists?.filter(
        (topic) => !topics.includes(topic.topicId)
      );

      if (topicsToBeDeleted)
        await Promise.all([
          topicsToBeDeleted.map((topic) =>
            this.postTopicRepository.delete(topic)
          ),
        ]);

      const topicsToBeAdded = topics.filter(
        (topicId) => !topicsExists?.some((t) => t.topicId === topicId)
      );

      topicsToBeAdded.map(
        async (topicId) =>
          await this.postTopicRepository.save(
            PostTopic.create({
              postId: post.id,
              topicId,
            })
          )
      );
    }

    const editedTopics = await this.postTopicRepository.getByPostId(post.id);

    const blogger = await this.bloggerRepository.getById(bloggerId);

    if (blogger?.role !== "ADMIN" && post.authorId !== blogger?.id) {
      throw new NotAllowedError();
    }

    post.content = content;
    post.title = title;
    post.topics = editedTopics.map((topic) => topic.topicId);

    await this.postRepository.update(post);
  }
}
