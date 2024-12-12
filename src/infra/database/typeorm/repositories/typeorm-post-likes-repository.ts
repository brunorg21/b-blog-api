import { appDataSource } from "..";
import { Repository } from "typeorm";
import { ToTypeormPostLikesMapper } from "../mappers/toTypeormPostLikesMapper";
import { PostLikeRepository } from "@/domain/blog/app/repositories/post-like-repository";
import { PostLikeEntity } from "../schemas/post-likes";
import { PostLike } from "@/domain/blog/enterprise/entities/post-like";

export class TypeormPostLikesRepository implements PostLikeRepository {
  private typeormPostLikesRepository: Repository<PostLikeEntity>;

  constructor() {
    this.typeormPostLikesRepository =
      appDataSource.getRepository(PostLikeEntity);
  }
  async getByBloggerId(
    bloggerId: string,
    postId: string
  ): Promise<PostLike | null> {
    const postLike = await this.typeormPostLikesRepository.findOne({
      where: {
        bloggerId,
        postId,
      },
    });

    if (!postLike) {
      return null;
    }

    return ToTypeormPostLikesMapper.toDomain(postLike);
  }
  async save(postLike: PostLike): Promise<void> {
    const postLikeEntity = ToTypeormPostLikesMapper.toPostLikeEntity(postLike);

    await this.typeormPostLikesRepository.save(postLikeEntity);
  }
  async update(postLike: PostLike): Promise<void> {
    await this.typeormPostLikesRepository.update(postLike.id, postLike);
  }
  async delete(postLike: PostLike): Promise<void> {
    const postLikeEntity = ToTypeormPostLikesMapper.toPostLikeEntity(postLike);

    await this.typeormPostLikesRepository.remove(postLikeEntity);
  }
  async getByPostId(postId: string): Promise<PostLike[]> {
    const postLikes = await this.typeormPostLikesRepository.find({
      where: {
        postId,
      },
    });

    return postLikes.map((postLike) =>
      ToTypeormPostLikesMapper.toDomain(postLike)
    );
  }
}
