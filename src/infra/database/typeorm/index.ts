import { DataSource } from "typeorm";

import { fileURLToPath } from "url";
import { dirname } from "path";
import "reflect-metadata";
import { env } from "@/env";
import { BloggerEntity } from "./schemas/blogger";
import { BloggerCommunityEntity } from "./schemas/blogger-community";
import { CommentLikeEntity } from "./schemas/comment-likes";
import { CommentEntity } from "./schemas/comment";
import { CommunityBloggerEntity } from "./schemas/community-blogger";
import { NotificationEntity } from "./schemas/notification";
import { PostLikeEntity } from "./schemas/post-likes";
import { PostTopicsEntity } from "./schemas/post-topics";
import { PostEntity } from "./schemas/post";
import { TopicEntity } from "./schemas/topic";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const appDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    BloggerEntity,
    BloggerCommunityEntity,
    CommentLikeEntity,
    CommentEntity,
    CommunityBloggerEntity,
    NotificationEntity,
    PostLikeEntity,
    PostTopicsEntity,
    PostEntity,
    TopicEntity,
  ],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
