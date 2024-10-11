import { Like, LikeProps } from "./like";

interface PostLikeProps extends LikeProps {
  postId: string;
}

export class PostLike extends Like<PostLikeProps> {
  get postId() {
    return this.props.postId;
  }

  static create(
    props: Omit<PostLikeProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const postLike = new PostLike(
      {
        ...props,
        authorId: props.authorId,
        createdAt: new Date(),
        updatedAt: null,
      },
      id
    );

    return postLike;
  }
}
