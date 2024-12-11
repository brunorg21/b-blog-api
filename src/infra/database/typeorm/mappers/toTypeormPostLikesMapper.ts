import { PostLike } from "@/domain/blog/enterprise/entities/post-like";
import { PostLikeEntity } from "../schemas/post-likes";

export class ToTypeormPostLikesMapper {
  static toPostLikeEntity(post: PostLike): PostLikeEntity {
    return {
      id: post.id,
      postId: post.postId,
      bloggerId: post.bloggerId,
    };
  }

  static toDomain(postLikeEntity: PostLikeEntity): PostLike {
    return PostLike.create(
      {
        bloggerId: postLikeEntity.bloggerId,
        postId: postLikeEntity.postId,
        likedAt: postLikeEntity.likedAt,
      },
      postLikeEntity.id
    );
  }
}
