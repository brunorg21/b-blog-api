import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJWT } from "../middlewares/verify-jwt";
import { BloggerCommunityController } from "../controllers/blogger-community-controller";
import { BloggersCommunity } from "@/domain/blog/enterprise/entities/bloggers-community";
import {
  createBloggerCommunitySchema,
  paramsBloggersCommunityBySlugSchema,
  paramsBloggersCommunitySchema,
  updateBloggerCommunitySchema,
} from "@/utils/blogger-community-schemas";
import { TypeormBloggerCommunityRepository } from "@/infra/database/typeorm/repositories/typeorm-bloggers-community-repository";
import { TypeormBloggerRepository } from "@/infra/database/typeorm/repositories/typeorm-blogger-repository";
import { BloggersCommunityPresenter } from "../presenters/bloggers-community-presenter";
import { RedisClient } from "@/infra/cache/redis/redis-client";
import { RedisRepository } from "@/infra/cache/redis/redis-repository";
import { TypeormCommunityBloggerRepository } from "@/infra/database/typeorm/repositories/typeorm-community-blogger-repository";
import { BloggersCommunityWithPostsPresenter } from "../presenters/bloggers-community-with-posts-presenter";

class BloggersCommunityRoutes {
  constructor(
    private readonly app: FastifyInstance,
    private readonly bloggerCommunityController: BloggerCommunityController
  ) {}

  async listen() {
    this.app.addHook("onRequest", verifyJWT);

    //POST
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/bloggersCommunities",
      schema: {
        summary: "Create new blogger community",
        tags: ["Bloggers Communities"],
        body: createBloggerCommunitySchema,
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const { name, avatarUrl, description } = req.body;

          await this.bloggerCommunityController.create(
            BloggersCommunity.create({
              authorId: req.user.sub,
              avatarUrl,
              description,
              name,
              slug: name,
            })
          );

          return reply.status(201).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //GET
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/bloggersCommunities",
      schema: {
        summary: "List all bloggersCommunities",
        tags: ["Bloggers Communities"],
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const bloggersCommunities =
            await this.bloggerCommunityController.getAllBloggersCommunity(
              req.user.sub
            );

          return reply.status(200).send({
            bloggersCommunities: bloggersCommunities.map(
              BloggersCommunityPresenter.toHTTP
            ),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });

    //GET BY AUTHOR
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/bloggersCommunities/author",
      schema: {
        summary: "List all bloggersCommunities by author",
        tags: ["Bloggers Communities"],
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const bloggersCommunities =
            await this.bloggerCommunityController.getBloggerCommunitiesByAuthor(
              req.user.sub
            );

          return reply.status(200).send({
            bloggersCommunities: bloggersCommunities.map(
              BloggersCommunityPresenter.toHTTP
            ),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //GET BY BLOGGER
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/bloggersCommunities/blogger",
      schema: {
        summary: "List all bloggersCommunities by blogger",
        tags: ["Bloggers Communities"],
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const bloggersCommunities =
            await this.bloggerCommunityController.getBloggerCommunitiesByBlogger(
              req.user.sub
            );

          return reply.status(200).send({
            bloggersCommunities: bloggersCommunities.map(
              BloggersCommunityPresenter.toHTTP
            ),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });

    //GET UNIQUE BY SLUG
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/bloggersCommunities/details",
      schema: {
        summary: "Get unique blogger community by slug",
        tags: ["Bloggers Communities"],
        security: [{ bearerAuth: [] }],
        querystring: paramsBloggersCommunityBySlugSchema,
      },

      handler: async (req, reply) => {
        try {
          const { slug, page } = req.query;

          const bloggerCommunity =
            await this.bloggerCommunityController.getBySlug(slug, { page });

          return reply.status(200).send({
            bloggerCommunity:
              BloggersCommunityWithPostsPresenter.toHTTP(bloggerCommunity),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //DELETE
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "DELETE",
      url: "/bloggersCommunities/:id",
      schema: {
        summary: "Delete bloggersCommunity",
        tags: ["Bloggers Communities"],
        security: [{ bearerAuth: [] }],
        params: paramsBloggersCommunitySchema,
      },

      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          await this.bloggerCommunityController.delete(id, req.user.sub);

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });

    //UPDATE
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "PUT",
      url: "/bloggersCommunities/:id",
      schema: {
        summary: "Update bloggersCommunity",
        tags: ["Bloggers Communities"],
        security: [{ bearerAuth: [] }],
        params: paramsBloggersCommunitySchema,
        body: updateBloggerCommunitySchema,
      },
      handler: async (req, reply) => {
        try {
          const { id } = req.params;
          const { description, name } = req.body;

          await this.bloggerCommunityController.updateBloggerCommunity(
            {
              id,
              description,
              name,
            },
            req.user.sub
          );

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
  }
}

export const bloggersCommunityRoutes = (app: FastifyInstance) => {
  const redis = RedisClient.getInstance();

  const redisRepository = new RedisRepository(redis);

  const bloggersCommunityRepository = new TypeormBloggerCommunityRepository(
    redisRepository
  );
  const bloggerRepository = new TypeormBloggerRepository();
  const communityBloggerRepository = new TypeormCommunityBloggerRepository();

  const bloggersCommunityController = new BloggersCommunityRoutes(
    app,
    new BloggerCommunityController(
      bloggersCommunityRepository,
      bloggerRepository,
      communityBloggerRepository
    )
  );

  return bloggersCommunityController;
};
