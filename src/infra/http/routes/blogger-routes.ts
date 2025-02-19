import { FastifyInstance } from "fastify";
import { BloggerController } from "../controllers/blogger-controller";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  authenticateSchema,
  registerSchema,
  updateBloggerSchema,
} from "@/utils/blogger-schemas";
import { TypeormBloggerRepository } from "@/infra/database/typeorm/repositories/typeorm-blogger-repository";
import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { z } from "zod";
import { verifyJWT } from "../middlewares/verify-jwt";
import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerPresenter } from "../presenters/blogger-presenter";

class BloggerRoutes {
  constructor(
    private readonly app: FastifyInstance,
    private readonly bloggerController: BloggerController
  ) {}

  async listen() {
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/blogger/authenticate",
      schema: {
        body: authenticateSchema,
        description: "Authenticate",
        tags: ["Blogger"],
        summary: "Authenticate",
      },

      handler: async (req, reply) => {
        try {
          const { email, password } = req.body;

          const blogger = await this.bloggerController.authenticate({
            email,
            password,
          });

          const token = await reply.jwtSign(
            {},
            {
              sign: {
                sub: blogger.id,
                expiresIn: "7d",
              },
            }
          );

          return reply.status(200).send({
            token,
            blogger: {
              id: blogger.id,
              name: blogger.name,
              email: blogger.email,
              avatarUrl: blogger.avatarUrl,
              role: blogger.role,
            },
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });

    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/blogger/register",
      schema: {
        body: registerSchema,
        description: "Register account blogger",
        tags: ["Blogger"],
        summary: "Register account blogger",
      },

      handler: async (req, reply) => {
        try {
          const { email, password, avatarUrl, role, name } = req.body;

          await this.bloggerController.create(
            Blogger.create({
              avatarUrl,
              email,
              name,
              password,
              role,
            })
          );

          reply.status(201).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/blogger/me",
      schema: {
        description: "Get blogger profile",
        tags: ["Blogger"],
        summary: "Get blogger profile",
      },
      preHandler: [verifyJWT],

      handler: async (req, reply) => {
        try {
          const blogger = await this.bloggerController.getAuthenticatedBlogger(
            req.user.sub
          );

          reply.status(200).send({
            blogger: BloggerPresenter.toHTTP(blogger),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });

    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "PUT",
      url: "/blogger/:id",
      preHandler: [verifyJWT],
      schema: {
        body: updateBloggerSchema,
        params: z.object({
          id: z.string(),
        }),
        description: "Update blogger account",
        tags: ["Blogger"],
        security: [{ bearerAuth: [] }],
        summary: "Update blogger account",
      },

      handler: async (req, reply) => {
        try {
          const { email, avatarUrl, role, name } = req.body;

          const { id } = req.params;

          await this.bloggerController.updateBlogger({
            avatarUrl,
            email,
            id,
            name,
            role,
          });

          reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
  }
}

export const bloggerRoutes = (app: FastifyInstance) => {
  const bloggerRepository = new TypeormBloggerRepository();
  const hasher = new BcryptHasher();

  const bloggerController = new BloggerRoutes(
    app,
    new BloggerController(bloggerRepository, hasher)
  );

  return bloggerController;
};
