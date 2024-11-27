import { InvalidCredentialsError } from "@/domain/blog/app/use-cases/@errors/invalid-credentials";
import { NotAllowedError } from "@/domain/blog/app/use-cases/@errors/not-allowed-error";
import { ResourceNotFoundError } from "@/domain/blog/app/use-cases/@errors/resource-not-found-error";
import { UserAlreadyExistsError } from "@/domain/blog/app/use-cases/@errors/user-already-exists-error";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { InternalServerError } from "./http/@errors/internal-server-error";

export function errorHandler(
  err: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply
) {
  console.error(err);
  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      errors: err.flatten().fieldErrors,
    });
  }

  if (err instanceof ResourceNotFoundError) {
    return reply.status(400).send({
      message: err.message,
    });
  }

  if (err instanceof UserAlreadyExistsError) {
    return reply.status(400).send({
      message: err.message,
    });
  }

  if (err instanceof InvalidCredentialsError) {
    return reply.status(400).send({
      message: err.message,
    });
  }

  if (err instanceof UserAlreadyExistsError) {
    return reply.status(400).send({
      message: err.message,
    });
  }

  if (err instanceof NotAllowedError) {
    return reply.status(405).send({
      message: err.message,
    });
  }

  return reply.status(500).send(new InternalServerError(err.message));
}
