import { DataSource } from "typeorm";

import { fileURLToPath } from "url";
import { dirname } from "path";
import "reflect-metadata";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "docker",
  database: "blog-api-db",
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/**/schemas/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
