import { DataSource } from "typeorm";
import "reflect-metadata";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "docker",
  database: "blog-api-db",
  synchronize: true,
  logging: true,
  entities: ["./schemas/*.ts"],
  migrations: ["./migrations/*.ts"],
});
