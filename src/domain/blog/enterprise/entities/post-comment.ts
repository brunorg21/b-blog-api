import { Comment, CommentProps } from "./comment";

interface PostCommentProps extends CommentProps {
  postId: string;
}

export class PostComment extends Comment<PostCommentProps> {
  get postId() {
    return this.props.postId;
  }

  static create(
    props: Omit<PostCommentProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const postComment = new PostComment(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: null,
      },
      id
    );

    return postComment;
  }
}
