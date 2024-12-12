export interface LikePostCommentProps {
  commentId: string;
  bloggerId: string;
}
export interface UpdatePostCommentProps {
  authorId: string;
  content: string;
  postCommentId: string;
}

export interface PostCommentControllerInterface {
  likePostComment(data: LikePostCommentProps): Promise<void>;
  removeLikePostComment(data: LikePostCommentProps): Promise<void>;
  updatePostComment(data: UpdatePostCommentProps): Promise<void>;
}
