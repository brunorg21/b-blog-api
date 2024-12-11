import { appDataSource } from "..";
import { Repository } from "typeorm";
import { ToTypeormCommentLikesMapper } from "../mappers/toTypeormCommentLikesMapper";
import { CommentLikeRepository } from "@/domain/blog/app/repositories/comment-like-repository";
import { CommentLikeEntity } from "../schemas/comment-likes";
import { CommentLike } from "@/domain/blog/enterprise/entities/comment-like";

export class TypeormCommentLikesRepository implements CommentLikeRepository {
  private typeormCommentLikesRepository: Repository<CommentLikeEntity>;

  constructor() {
    this.typeormCommentLikesRepository =
      appDataSource.getRepository(CommentLikeEntity);
  }
  async getByBloggerId(
    bloggerId: string,
    commentId: string
  ): Promise<CommentLike | null> {
    const commentLike = await this.typeormCommentLikesRepository.findOne({
      where: {
        bloggerId,
        commentId,
      },
    });

    if (!commentLike) {
      return null;
    }

    return ToTypeormCommentLikesMapper.toDomain(commentLike);
  }
  async save(commentLike: CommentLike): Promise<void> {
    await this.typeormCommentLikesRepository.save(commentLike);
  }
  async update(commentLike: CommentLike): Promise<void> {
    await this.typeormCommentLikesRepository.update(commentLike.id, commentLike);
  }
  async delete(commentLike: CommentLike): Promise<void> {
    await this.typeormCommentLikesRepository.remove(commentLike);
  }
  async getByCommentId(commentId: string): Promise<CommentLike[]> {
    const commentLikes = await this.typeormCommentLikesRepository.find({
      where: {
        commentId,
      },
    });

    return commentLikes.map((commentLike) =>
      ToTypeormCommentLikesMapper.toDomain(commentLike)
    );
  }
}
