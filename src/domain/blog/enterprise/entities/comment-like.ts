import { randomUUID } from "node:crypto";

interface CommentLikeProps {
  commentId: string;
  bloggerId: string;
  likedAt?: Date;
}

export class CommentLike {
  private _id: string;
  constructor(private props: CommentLikeProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
  get commentId() {
    return this.props.commentId;
  }
  get bloggerId() {
    return this.props.bloggerId;
  }

  static create(props: CommentLikeProps, id?: string) {
    const commentLike = new CommentLike(
      {
        ...props,
      },
      id
    );

    return commentLike;
  }
}
