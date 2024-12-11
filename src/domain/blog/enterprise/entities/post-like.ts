import { randomUUID } from "node:crypto";

interface PostLikeProps {
  postId: string;
  bloggerId: string;
  likedAt?: Date;
}

export class PostLike {
  private _id: string;
  constructor(private props: PostLikeProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }
  get postId() {
    return this.props.postId;
  }
  get bloggerId() {
    return this.props.bloggerId;
  }

  static create(props: PostLikeProps, id?: string) {
    const postLike = new PostLike(
      {
        ...props,
      },
      id
    );

    return postLike;
  }
}
