import { Post } from "./domain/blog/enterprise/entities/post";
import { PostComment } from "./domain/blog/enterprise/entities/post-comment";

const post = Post.create({
  authorId: "user-id",
  communityId: "community-id",
  content: "muito bom viver tudo isso!",
  title: "viagem",
  attachments: [],
});

const postComment = PostComment.create({
  authorId: "user-id",
  content: "comment",
  postId: post._id,
});
