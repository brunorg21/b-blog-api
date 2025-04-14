import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { verifyJWT } from "../middlewares/verify-jwt";
import { NotificationController } from "../controllers/notification-controller";
import { NotificationPresenter } from "@/infra/ws/presenters/notification-presenter";
import { TypeormNotificationRepository } from "@/infra/database/typeorm/repositories/typeorm-notification-repository";
import { deleteNotificationSchema } from "@/utils/notification-schema";

class NotificationRoutes {
  constructor(
    private readonly app: FastifyInstance,
    private readonly notificationController: NotificationController
  ) {}

  async listen() {
    this.app.addHook("onRequest", verifyJWT);

    //GET
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: "/notifications",
      schema: {
        summary: "Get notifications by recipient",
        tags: ["Notifications"],
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const notifications =
            await this.notificationController.getNotificationsByRecipient({
              recipientId: req.user.sub,
            });

          return reply.status(200).send({
            notifications: notifications.map(NotificationPresenter.toHTTP),
          });
        } catch (error) {
          reply.send(error);
        }
      },
    });

    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "DELETE",
      url: "/notifications/:id",
      schema: {
        summary: "Delete notification",
        tags: ["Notifications"],
        security: [{ bearerAuth: [] }],
        params: deleteNotificationSchema,
      },

      handler: async (req, reply) => {
        const { id } = req.params;
        try {
          await this.notificationController.delete(id);

          return reply.status(204).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
  }
}

export const notificationRoutes = (app: FastifyInstance) => {
  const notificationRepository = new TypeormNotificationRepository();

  const notificationController = new NotificationRoutes(
    app,
    new NotificationController(notificationRepository)
  );

  return notificationController;
};
