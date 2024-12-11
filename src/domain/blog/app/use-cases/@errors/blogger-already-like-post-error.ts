export class BloggerAlreadyLikePostError extends Error {
  constructor() {
    super(`You already like this post.`);
  }
}
