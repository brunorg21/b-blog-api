import { randomUUID } from "crypto";

interface PostCommentProps {
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class PostComment {
  protected id: string;
  constructor(private props: PostCommentProps, postCommentId?: string) {
    this.props = props;
    if (postCommentId) {
      this.id = postCommentId;
    }

    this.id = randomUUID();
  }

  get _id() {
    return this.id;
  }
  get content() {
    return this.props.content;
  }
  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get postId() {
    return this.props.postId;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set content(content: string) {
    this.props.content = content;
  }
  set authorId(authorId: string) {
    this.props.authorId = authorId;
  }

  static create(
    props: Omit<PostCommentProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const postComment = new PostComment(
      {
        authorId: props.authorId,
        content: props.content,
        createdAt: new Date(),
        updatedAt: null,
        postId: props.postId,
      },
      id
    );

    return postComment;
  }
}
