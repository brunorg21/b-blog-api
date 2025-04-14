import fastify from "fastify";
import { appDataSource, runMigrationsIfNeeded } from "./database/typeorm";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { bloggerRoutes } from "./http/routes/blogger-routes";
import fastifyJwt from "@fastify/jwt";
import { postRoutes } from "./http/routes/post-routes";
import { errorHandler } from "./error-handler";
import { topicRoutes } from "./http/routes/topic-routes";
import { bloggersCommunityRoutes } from "./http/routes/blogger-community-routes";
import { communityBloggerRoutes } from "./http/routes/community-blogger-routes";
import { wsApp } from "./ws/web-socket";
import { postCommentRoutes } from "./http/routes/post-comment-routes";
import { env } from "@/env";
import { notificationRoutes } from "./http/routes/notification-routes";

export const initializeServer = async () => {
  try {
    await appDataSource.initialize();
    await runMigrationsIfNeeded(appDataSource);
    console.log("Database has been initialized successfully.");
  } catch (err) {
    console.log("Error during Data Source initialization", err);
    process.exit(1);
  }

  try {
    wsApp.listen(env.WS_PORT, () => {
      console.log("WebSocket server listening on port 3001");
    });
  } catch (err) {
    console.log("Error during socket initialization", err);
    process.exit(1);
  }

  const app = fastify();

  await app.register(fastifyCors, {
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "blog-api",
        description: "an api for blog",
        version: "1.0.0",
      },
      servers: [],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  app.setErrorHandler(errorHandler);

  app.register(fastifySwaggerUI, {
    routePrefix: "/documentation",
  });

  app.register(fastifyJwt, {
    secret: env.SECRET_KEY,
  });

  app.register((server) => bloggerRoutes(server).listen());
  app.register((server) => postRoutes(server).listen());
  app.register((server) => topicRoutes(server).listen());
  app.register((server) => bloggersCommunityRoutes(server).listen());
  app.register((server) => communityBloggerRoutes(server).listen());
  app.register((server) => postCommentRoutes(server).listen());
  app.register((server) => notificationRoutes(server).listen());

  try {
    await app.listen({
      port: env.SERVER_PORT,
      host: "0.0.0.0",
    });
  } catch (err) {
    console.log("Error during server initialization", err);
    process.exit(1);
  }
};
