import { PostDetails } from "./post-with-details";

export interface BloggerCommunityWithPostsProps {
  bloggerCommunityId: string;
  name: string;
  description: string;
  avatarUrl: string | null;
  authorId: string;
  author: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  posts: PostDetails[];
}

export class BloggerCommunityWithPosts {
  private props: BloggerCommunityWithPostsProps;

  constructor(props: BloggerCommunityWithPostsProps) {
    this.props = props;
  }
  get name() {
    return this.props.name;
  }
  get bloggerCommunityId() {
    return this.props.bloggerCommunityId;
  }

  get posts() {
    return this.props.posts;
  }

  get slug() {
    return this.props.slug;
  }

  get avatarUrl() {
    return this.props.avatarUrl;
  }

  get description() {
    return this.props.description;
  }

  get authorId() {
    return this.props.authorId;
  }
  get author() {
    return this.props.author;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: BloggerCommunityWithPostsProps) {
    return new BloggerCommunityWithPosts(props);
  }
}
