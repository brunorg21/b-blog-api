import { randomUUID } from "crypto";

interface PostProps {
  title: string;
  content: string;
  authorId: string;
  bloggersCommunityId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  attachments: string[];
}

export class Post {
  private id: string;
  constructor(private props: PostProps, postId?: string) {
    this.props = props;
    this.id = postId ?? randomUUID();
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
  get bloggersCommunityId() {
    return this.props.bloggersCommunityId;
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

  set bloggersCommunityId(bloggersCommunityId: string | null) {
    this.props.bloggersCommunityId = bloggersCommunityId;
  }

  static create(
    props: Omit<PostProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const post = new Post(
      {
        authorId: props.authorId,
        bloggersCommunityId: props.bloggersCommunityId,
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
