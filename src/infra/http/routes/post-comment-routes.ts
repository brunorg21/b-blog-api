import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { TypeormBloggerRepository } from "@/infra/database/typeorm/repositories/typeorm-blogger-repository";
import { verifyJWT } from "../middlewares/verify-jwt";
import { PostCommentController } from "../controllers/post-comment-controller";
import {
  commentByPostSchema,
  createCommentSchema,
  paramsCommentSchema,
  queryCommentSchema,
  updateCommentSchema,
} from "@/utils/comment-schemas";
import { PostComment } from "@/domain/blog/enterprise/entities/post-comment";
import { TypeormPostCommentRepository } from "@/infra/database/typeorm/repositories/typeorm-comment-repository";
import { TypeormCommentLikesRepository } from "@/infra/database/typeorm/repositories/typeorm-comment-likes-repository";
import { CommentDetailsPresenter } from "../presenters/comment-details-presenter";

class PostCommentRoutes {
  constructor(
    private readonly app: FastifyInstance,
    private readonly postCommentController: PostCommentController
  ) {}

  async listen() {
    this.app.addHook("onRequest", verifyJWT);

    //GET
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/comments/:postId",
      schema: {
        summary: "Get comments",
        tags: ["Comments"],
        querystring: queryCommentSchema,
        params: commentByPostSchema,
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const { page } = req.query;

          const { postId } = req.params;

          const comments =
            await this.postCommentController.getPostCommentsByPost(
              {
                page: page!,
              },
              postId
            );

          return reply.status(200).send({
            comments: comments.map(CommentDetailsPresenter.toHTTP),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //POST
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/comments",
      schema: {
        summary: "Create new comment",
        tags: ["Comments"],
        body: createCommentSchema,
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const { content, postId } = req.body;

          await this.postCommentController.create(
            PostComment.create({
              likeCount: 0,
              authorId: req.user.sub,
              content,
              postId,
            })
          );

          return reply.status(201).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //UPDATE
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "PUT",
      url: "/comments/:id",
      schema: {
        summary: "Update comment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        body: updateCommentSchema,
        params: paramsCommentSchema,
      },

      handler: async (req, reply) => {
        try {
          const { content, authorId } = req.body;

          const { id } = req.params;

          await this.postCommentController.updatePostComment({
            postCommentId: id,
            authorId,
            content,
          });

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //PATCH
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "PATCH",
      url: "/comments/like/:id",
      schema: {
        summary: "Like comment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        params: paramsCommentSchema,
      },

      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          await this.postCommentController.likePostComment({
            bloggerId: req.user.sub,
            commentId: id,
          });

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //PATCH
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "PATCH",
      url: "/comments/remove-like/:id",
      schema: {
        summary: "Remove like comment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        params: paramsCommentSchema,
      },

      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          await this.postCommentController.removeLikePostComment({
            bloggerId: req.user.sub,
            commentId: id,
          });

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //DELETE
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "DELETE",
      url: "/comments/:id",
      schema: {
        summary: "Delete comment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        params: paramsCommentSchema,
      },

      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          await this.postCommentController.delete(id, req.user.sub);

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
  }
}

export const postCommentRoutes = (app: FastifyInstance) => {
  const postCommentRepository = new TypeormPostCommentRepository();
  const bloggerRepository = new TypeormBloggerRepository();
  const commentLikeRepository = new TypeormCommentLikesRepository();

  const postcommentController = new PostCommentRoutes(
    app,
    new PostCommentController(
      postCommentRepository,
      bloggerRepository,
      commentLikeRepository
    )
  );

  return postcommentController;
};
