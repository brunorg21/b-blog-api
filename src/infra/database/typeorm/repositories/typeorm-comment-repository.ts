import { appDataSource } from "..";
import { Repository } from "typeorm";

import { CommentEntity } from "../schemas/comment";
import { PostCommentRepository } from "@/domain/blog/app/repositories/post-comment-repository";
import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { PaginatedParams } from "@/core/params";
import { ToTypeormCommentMapper } from "../mappers/toTypeormCommentMapper";

export class TypeormPostCommentRepository implements PostCommentRepository {
  private typeormPostCommentRepository: Repository<CommentEntity>;

  constructor() {
    this.typeormPostCommentRepository =
      appDataSource.getRepository(CommentEntity);
  }
  async getByPost(
    { page }: PaginatedParams,
    postId: string
  ): Promise<PostComment[]> {
    const postComments = await this.typeormPostCommentRepository.find({
      where: {
        postId,
      },
      order: {
        createdAt: "DESC",
      },
      skip: (page - 1) * 10,
      take: 10,
    });

    return postComments.map((postComment) =>
      ToTypeormCommentMapper.toPostCommentDomain(postComment)
    );
  }
  async save(postComment: PostComment): Promise<void> {
    const typeormPostComment =
      ToTypeormCommentMapper.toCommentEntityForPost(postComment);

    this.typeormPostCommentRepository.save(typeormPostComment);
  }

  async getById(id: string): Promise<PostComment | null> {
    const postComment = await this.typeormPostCommentRepository.findOneBy({
      id,
    });

    if (!postComment) {
      return null;
    }

    return ToTypeormCommentMapper.toPostCommentDomain(postComment);
  }

  async update(postComment: PostComment): Promise<void> {
    await this.typeormPostCommentRepository.save(postComment);
  }

  async delete(postcomment: PostComment): Promise<void> {
    await this.typeormPostCommentRepository.remove(postcomment);
  }
}
