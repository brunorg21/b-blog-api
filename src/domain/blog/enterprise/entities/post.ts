import { randomUUID } from "crypto";

interface PostProps {
  title: string;
  content: string;
  authorId: string;
  bloggersCommunityId: string | null;
  createdAt?: Date;
  updatedAt: Date | null;
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
  get authorId() {
    return this.props.authorId;
  }
  get bloggersCommunityId() {
    return this.props.bloggersCommunityId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set title(title: string) {
    this.props.title = title;
    this.update();
  }
  set content(content: string) {
    this.props.content = content;
    this.update();
  }
  set authorId(authorId: string) {
    this.props.authorId = authorId;
  }

  set bloggersCommunityId(bloggersCommunityId: string | null) {
    this.props.bloggersCommunityId = bloggersCommunityId;
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
        bloggersCommunityId: props.bloggersCommunityId,
        content: props.content,
        createdAt: new Date(),
        title: props.title,
        updatedAt: null,
      },
      id
    );

    return post;
  }
}
