import fastify from "fastify";
import { appDataSource } from "./database/typeorm";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { bloggerRoutes } from "./http/routes/blogger-routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { InternalServerError } from "./http/@errors/internal-server-error";
import { postRoutes } from "./http/routes/post-routes";

try {
  await appDataSource.initialize();
  console.log("Database has been initialized successfully.");
} catch (err) {
  console.log("Error during Data Source initialization", err);
  process.exit(1);
}

const app = fastify();

await app.register(fastifyCors, {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: err.flatten().fieldErrors,
    })
  }
  console.error(err);
  return reply.status(500).send(new InternalServerError(err.message));
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.register(fastifyJwt, {
  secret: "secret",
});

app.register((server) => bloggerRoutes(server).listen());
app.register((server) => postRoutes(server).listen());

app
  .listen({
    port: 3000,
    host: "0.0.0.0",
  })
  .then((e) => console.log(`Server running on ${e}`));
