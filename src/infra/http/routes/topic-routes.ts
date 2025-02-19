import { FastifyInstance } from "fastify";
import { TopicController } from "../controllers/topic-controller";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { TypeormTopicRepository } from "@/infra/database/typeorm/repositories/typeorm-topic-repository";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createTopicSchema, paramsTopicSchema } from "@/utils/topic-schemas";
import { Topic } from "@/domain/blog/enterprise/entities/topic";
import { TopicPresenter } from "../presenters/topic-presenter";

class TopicRoutes {
  constructor(
    private readonly app: FastifyInstance,
    private readonly topicController: TopicController
  ) {}

  async listen() {
    this.app.addHook("onRequest", verifyJWT);

    //POST
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/topics",
      schema: {
        summary: "Create new topic",
        tags: ["Topics"],
        body: createTopicSchema,
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const topics = req.body;

          await this.topicController.createTopic(
            topics.map((topic) =>
              Topic.create({
                name: topic.name,
                slug: topic.name,
              })
            )
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
      url: "/topics",
      schema: {
        summary: "List all topics",
        tags: ["Topics"],
        security: [{ bearerAuth: [] }],
      },

      handler: async (_, reply) => {
        try {
          const topics = await this.topicController.get();

          return reply.status(200).send({
            topics: topics.map(TopicPresenter.toHTTP),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });
    //DELETE
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "DELETE",
      url: "/topics/:id",
      schema: {
        summary: "Delete topic",
        tags: ["Topics"],
        security: [{ bearerAuth: [] }],
        params: paramsTopicSchema,
      },

      handler: async (req, reply) => {
        try {
          const { id } = req.params;

          await this.topicController.delete(id);

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
  }
}

export const topicRoutes = (app: FastifyInstance) => {
  const topicRepository = new TypeormTopicRepository();

  const topicController = new TopicRoutes(
    app,
    new TopicController(topicRepository)
  );

  return topicController;
};
