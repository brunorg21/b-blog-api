import { FastifyInstance } from "fastify";
import { PostController } from "../controllers/post-controller";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { TypeormPostRepository } from "@/infra/database/typeorm/repositories/typeorm-post-repository";

import { TypeormBloggerRepository } from "@/infra/database/typeorm/repositories/typeorm-blogger-repository";
import { TypeormPostTopicsRepository } from "@/infra/database/typeorm/repositories/typeorm-post-topics-repository";
import { verifyJWT } from "../middlewares/verify-jwt";
import {
  createPostSchema,
  paramsPostSchema,
  queryPostSchema,
  updatePostSchema,
} from "@/utils/post-schemas";
import { Post } from "@/domain/blog/enterprise/entities/post";
import { PostDetailsPresenter } from "../presenters/post-details-presenter";
import { PostWithCommentsPresenter } from "../presenters/post-comments-presenter";
import { TypeormPostLikesRepository } from "@/infra/database/typeorm/repositories/typeorm-post-likes-repository";

class PostRoutes {
  constructor(
    private readonly app: FastifyInstance,
    private readonly postController: PostController
  ) {}

  async listen() {
    this.app.addHook("onRequest", verifyJWT);

    //POST
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/posts",
      schema: {
        summary: "Create new post",
        tags: ["Posts"],
        body: createPostSchema,
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const { bloggerCommunityId, content, title, topics } = req.body;

          await this.postController.create(
            Post.create({
              likeCount: 0,
              authorId: req.user.sub,
              bloggerCommunityId: bloggerCommunityId ?? null,
              content,
              title,
              topics: topics!,
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
      url: "/posts/:id",
      schema: {
        summary: "Update post",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        body: updatePostSchema,
        params: paramsPostSchema,
      },

      handler: async (req, reply) => {
        try {
          const { content, title, topics } = req.body;

          const { id } = req.params;

          await this.postController.updatePost({
            content,
            bloggerId: req.user.sub,
            id,
            title,
            topics: topics!,
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
      url: "/posts/like/:id",
      schema: {
        summary: "Like post",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        params: paramsPostSchema,
      },

      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          await this.postController.likePost({
            bloggerId: req.user.sub,
            postId: id,
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
      url: "/posts/remove-like/:id",
      schema: {
        summary: "Remove like post",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        params: paramsPostSchema,
      },

      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          await this.postController.removeLikePost({
            bloggerId: req.user.sub,
            postId: id,
          });

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });

    //GET
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/posts",
      schema: {
        summary: "List all posts",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        querystring: queryPostSchema,
      },

      handler: async (req, reply) => {
        try {
          const { page, slug } = req.query;

          const posts = await this.postController.getPostsDetails({
            page: page!,
            query: slug,
          });

          return reply.status(200).send({
            posts: posts.map(PostDetailsPresenter.toHTTP),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });

    //GET POSTS BY BLOGGER
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/posts/blogger",
      schema: {
        summary: "List posts by blogger",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        querystring: queryPostSchema,
      },

      handler: async (req, reply) => {
        try {
          const { page } = req.query;

          const posts = await this.postController.getPostsWithDetailsByBlogger(
            {
              page: page!,
            },
            req.user.sub
          );

          return reply.status(200).send({
            posts: posts.map(PostDetailsPresenter.toHTTP),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //GET LIKED POSTS BY BLOGGER
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/posts/liked",
      schema: {
        summary: "List liked posts",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        querystring: queryPostSchema,
      },

      handler: async (req, reply) => {
        try {
          const { page } = req.query;

          const posts =
            await this.postController.getLikedPostsWithDetailsByBlogger(
              {
                page: page!,
              },
              req.user.sub
            );

          return reply.status(200).send({
            posts: posts.map(PostDetailsPresenter.toHTTP),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });

    //DELETE
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "DELETE",
      url: "/posts/:id",
      schema: {
        summary: "Delete post",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        params: paramsPostSchema,
      },

      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          await this.postController.delete(id, req.user.sub);

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });

    //GET UNIQUE POST
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/posts/:id",
      schema: {
        summary: "Get unique post",
        tags: ["Posts"],
        security: [{ bearerAuth: [] }],
        params: paramsPostSchema,
      },

      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          const post = await this.postController.getPostWithComments(id);

          return reply.status(200).send({
            post: PostWithCommentsPresenter.toHTTP(post),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });
  }
}

export const postRoutes = (app: FastifyInstance) => {
  const postRepository = new TypeormPostRepository();
  const bloggerRepository = new TypeormBloggerRepository();
  const postTopicsRepository = new TypeormPostTopicsRepository();
  const postLikeRepository = new TypeormPostLikesRepository();

  const postController = new PostRoutes(
    app,
    new PostController(
      postRepository,
      postTopicsRepository,
      bloggerRepository,
      postLikeRepository
    )
  );

  return postController;
};
