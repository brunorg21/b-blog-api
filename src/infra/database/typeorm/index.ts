import { DataSource } from "typeorm";

import { fileURLToPath } from "url";
import { dirname } from "path";
import "reflect-metadata";
import { env } from "@/env";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const appDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/**/schemas/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
