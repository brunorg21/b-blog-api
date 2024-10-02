import { Like, LikeProps } from "./like";
import { PostComment } from "./post-comment";

interface PostCommentLikeProps extends LikeProps {
  commentId: string;
}

export class PostCommentLike extends Like<PostCommentLikeProps> {
  get commentId() {
    return this.props.commentId;
  }

  static create(props: PostCommentLikeProps, id?: string) {
    const postCommentLike = new PostCommentLike(
      {
        ...props,
        authorId: props.authorId,
      },
      id
    );

    return postCommentLike;
  }
}
