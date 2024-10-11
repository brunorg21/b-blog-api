import { Like, LikeProps } from "./like";

interface PostCommentLikeProps extends LikeProps {
  commentId: string;
}

export class PostCommentLike extends Like<PostCommentLikeProps> {
  get commentId() {
    return this.props.commentId;
  }

  static create(
    props: Omit<PostCommentLikeProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const postCommentLike = new PostCommentLike(
      {
        ...props,
        authorId: props.authorId,
        createdAt: new Date(),
        updatedAt: null,
      },
      id
    );

    return postCommentLike;
  }
}
