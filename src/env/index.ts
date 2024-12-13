import { z } from "zod";
import "dotenv/config";

const envSchmea = z.object({
  DB_PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  SERVER_PORT: z.coerce.number().default(3000),
  WS_PORT: z.coerce.number().default(3001),
  SECRET_KEY: z.string(),
  REDIS_URL: z.string(),
});

const _env = envSchmea.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("Environment variables not found.");
}

export const env = _env.data;
