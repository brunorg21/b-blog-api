import { randomUUID } from "crypto";

interface PostProps {
  title: string;
  content: string;
  authorId: string;
  communityId: string;
  createdAt: Date;
  updatedAt: Date | null;
  attachments: string[];
}

export class Post {
  protected id: string;
  constructor(private props: PostProps, postId?: string) {
    this.props = props;
    if (postId) {
      this.id = postId;
    }

    this.id = randomUUID();
  }

  get _id() {
    return this.id;
  }
  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get authorId() {
    return this.props.authorId;
  }
  get communityId() {
    return this.props.communityId;
  }

  get attchments() {
    return this.props.attachments;
  }
  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set title(title: string) {
    this.props.title = title;
  }
  set content(content: string) {
    this.props.content = content;
  }
  set authorId(authorId: string) {
    this.props.authorId = authorId;
  }

  set communityId(communityId: string) {
    this.props.communityId = communityId;
  }

  static create(
    props: Omit<PostProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const post = new Post(
      {
        authorId: props.authorId,
        communityId: props.communityId,
        content: props.content,
        createdAt: new Date(),
        title: props.title,
        updatedAt: null,
        attachments: props.attachments,
      },
      id
    );

    return post;
  }
}
