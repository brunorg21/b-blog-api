import { PostRepository } from "@/domain/blog/app/repositories/post-repostitory";
import { Post } from "@/domain/blog/enterprise/entities/post";

export class InMemoryPostRepository implements PostRepository {
  public posts: Post[] = [];
  async save(post: Post): Promise<void> {
    this.posts.push(post);
  }
  async getById(id: string): Promise<Post | null> {
    const post = this.posts.find((post) => post._id === id);

    if (!post) {
      return null;
    }

    return post;
  }
  async getAll(): Promise<Post[]> {
    return this.posts;
  }
  async update(post: Post): Promise<void> {
    const postIndex = this.posts.findIndex((p) => p._id === post._id);
    this.posts[postIndex] = post;
  }
  async delete(post: Post): Promise<void> {
    const posts = this.posts.filter((p) => p._id !== post._id);

    this.posts = posts;
  }
}
