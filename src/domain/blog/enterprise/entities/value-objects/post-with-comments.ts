import { BloggersCommunity } from "../bloggers-community";
import { PostComment } from "../post-comment";
import { PostTopic } from "../topic-post";

export interface PostWithCommentsProps {
  postId: string;
  authorId: string;
  author: string;
  title: string;
  content: string;
  bloggerCommunity: BloggersCommunity | null;
  postTopics: PostTopic[];
  comments: PostComment[];
  createdAt: Date;
  updatedAt?: Date | null;
  likeCount: number;
}

export class PostWithComments {
  private props: PostWithCommentsProps;

  constructor(props: PostWithCommentsProps) {
    this.props = props;
  }
  get postId() {
    return this.props.postId;
  }
  get bloggerCommunity() {
    return this.props.bloggerCommunity;
  }

  get content() {
    return this.props.content;
  }

  get title() {
    return this.props.title;
  }
  get likeCount() {
    return this.props.likeCount;
  }

  get postTopics() {
    return this.props.postTopics;
  }

  get comments() {
    return this.props.comments;
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

  static create(props: PostWithCommentsProps) {
    return new PostWithComments(props);
  }
}
