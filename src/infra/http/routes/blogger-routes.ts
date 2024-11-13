import { FastifyInstance } from "fastify";
import { BloggerController } from "../controllers/blogger-controller";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { authenticateSchema, registerSchema } from "@/utils/blogger-schemas";
import { TypeormBloggerRepository } from "@/infra/database/typeorm/repositories/typeorm-blogger-repository";
import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/domain/blog/app/use-cases/@errors/user-already-exists-error";
import { InvalidCredentialsError } from "@/domain/blog/app/use-cases/@errors/invalid-credentials";
import { verifyJWT } from "../middlewares/verify-jwt";
import { ResourceNotFoundError } from "@/domain/blog/app/use-cases/@errors/resource-not-found-error";
import { Blogger } from "@/domain/blog/enterprise/entities/blogger";

class BloggerRoutes {
  constructor(
    private readonly app: FastifyInstance,
    private readonly bloggerController: BloggerController
  ) {}

  async listen() {
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/authenticate",
      schema: {
        body: authenticateSchema,
        description: "Authenticate",
        tags: ["Blogger"],
        summary: "Authenticate",
        response: {
          200: z.object({
            token: z.string(),
            blogger: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              avatarUrl: z.string().nullable(),
              role: z.string(),
            }),
          }),
          400: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
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
                expiresIn: "1d",
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
          if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ error: error.message });
          }

          throw new Error("Internal server error.");
        }
      },
    });

    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/register",
      schema: {
        body: registerSchema,
        description: "Register account blogger",
        tags: ["Blogger"],
        summary: "Register account blogger",
        response: {
          201: z.string(),
          400: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
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
          if (error instanceof UserAlreadyExistsError) {
            return reply.status(400).send({ error: error.message });
          }

          throw new Error("Internal server error.");
        }
      },
    });

    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "PUT",
      url: "/blogger",
      preHandler: [verifyJWT],
      schema: {
        body: registerSchema,
        params: z.object({
          id: z.string(),
        }),
        description: "Update blogger account",
        tags: ["Blogger"],
        summary: "Update blogger account",
        response: {
          201: z.string(),
          400: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },

      handler: async (req, reply) => {
        try {
          const { email, password, avatarUrl, role, name } = req.body;

          const { id } = req.params;

          await this.bloggerController.update(
            Blogger.create(
              {
                avatarUrl,
                email,
                name,
                password,
                role,
              },
              id
            )
          );

          reply.status(204).send();
        } catch (error) {
          if (error instanceof ResourceNotFoundError) {
            return reply.status(400).send({ error: error.message });
          }

          throw new Error("Internal server error.");
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
