export class BloggerAlreadyLikeCommentError extends Error {
  constructor() {
    super(`You already like this comment.`);
  }
}
