import { FastifyInstance } from "fastify";
import { TopicController } from "../controllers/topic-controller";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJWT } from "../middlewares/verify-jwt";
import { Topic } from "@/domain/blog/enterprise/entities/topic";
import { acceptInviteSchema } from "@/utils/community-blogger-schemas";
import { TypeormCommunityBloggerRepository } from "@/infra/database/typeorm/repositories/typeorm-community-blogger-repository";
import { TypeormBloggerRepository } from "@/infra/database/typeorm/repositories/typeorm-blogger-repository";
import { CommunityBloggerController } from "../controllers/community-blogger-controller";

class CommunityBloggerRoutes {
  constructor(
    private readonly app: FastifyInstance,
    private readonly communityBloggerController: CommunityBloggerController
  ) {}

  async listen() {
    this.app.addHook("onRequest", verifyJWT);

    //POST
    this.app.withTypeProvider<ZodTypeProvider>().route({
      method: "POST",
      url: "/invite",
      schema: {
        summary: "Invite blogger to community",
        tags: ["Blogger Community"],
        body: acceptInviteSchema,
        security: [{ bearerAuth: [] }],
      },

      handler: async (req, reply) => {
        try {
          const { bloggerCommunityId, bloggerId } = req.body;

          await this.communityBloggerController.inviteBloggerToCommunity({
            bloggerCommunityId,
            bloggerId,
          });

          return reply.status(201).send();
        } catch (error) {
          reply.send(error);
        }
      },
    });
  }
}

export const communityBloggerRoutes = (app: FastifyInstance) => {
  const typeormCommunityBloggerRepository =
    new TypeormCommunityBloggerRepository();
  const typeormBloggerRepository = new TypeormBloggerRepository();

  const communityBloggerController = new CommunityBloggerRoutes(
    app,
    new CommunityBloggerController(
      typeormCommunityBloggerRepository,
      typeormBloggerRepository
    )
  );

  return communityBloggerController;
};
