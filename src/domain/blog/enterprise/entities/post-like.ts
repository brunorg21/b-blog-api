import { Like, LikeProps } from "./like";

interface PostLikeProps extends LikeProps {
  postId: string;
}

export class PostLike extends Like<PostLikeProps> {
  get postId() {
    return this.props.postId;
  }

  static create(props: PostLikeProps, id?: string) {
    const postLike = new PostLike(
      {
        ...props,
        authorId: props.authorId,
      },
      id
    );

    return postLike;
  }
}
