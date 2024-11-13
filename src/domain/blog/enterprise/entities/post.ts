import { randomUUID } from "crypto";

interface PostProps {
  title: string;
  content: string;
  authorId: string;
  bloggerCommunityId: string | null;
  createdAt?: Date;
  updatedAt: Date | null;
  likeCount: number;
  topics: string[];
}

export class Post {
  private _id: string;
  constructor(private props: PostProps, postId?: string) {
    this.props = props;
    this._id = postId ?? randomUUID();
  }

  get id() {
    return this._id;
  }
  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get topics() {
    return this.props.topics;
  }
  get authorId() {
    return this.props.authorId;
  }
  get bloggerCommunityId() {
    return this.props.bloggerCommunityId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
  get likeCount() {
    return this.props.likeCount;
  }

  set title(title: string) {
    this.props.title = title;
    this.update();
  }

  set topics(topics: string[]) {
    this.props.topics = topics;
    this.update();
  }
  set content(content: string) {
    this.props.content = content;
    this.update();
  }
  set authorId(authorId: string) {
    this.props.authorId = authorId;
  }
  set likeCount(likeCount: number) {
    this.props.likeCount = likeCount;
  }

  set bloggersCommunityId(bloggerCommunityId: string | null) {
    this.props.bloggerCommunityId = bloggerCommunityId;
  }

  private update() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Omit<PostProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const post = new Post(
      {
        authorId: props.authorId,
        bloggerCommunityId: props.bloggerCommunityId,
        content: props.content,
        createdAt: new Date(),
        title: props.title,
        updatedAt: null,
        likeCount: props.likeCount,
        topics: props.topics,
      },
      id
    );

    return post;
  }
}
