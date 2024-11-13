import { BloggersCommunity } from "../bloggers-community";
import { Comment } from "../comment";
import { PostComment } from "../post-comment";
import { Topic } from "../topic";
import { PostTopic } from "../topic-post";

export interface PostDetailsProps {
  postId: string;
  authorId: string;
  author: string;
  title: string;
  content: string;
  bloggerCommunity: BloggersCommunity;
  postTopics: PostTopic[];
  comments: PostComment[];
  createdAt: Date;
  updatedAt?: Date | null;
  likeCount: number;
}

export class PostDetails {
  private props: PostDetailsProps;

  constructor(props: PostDetailsProps) {
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

  static create(props: PostDetailsProps) {
    return new PostDetails(props);
  }
}