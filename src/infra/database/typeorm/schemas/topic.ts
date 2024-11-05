import { PostTopic } from "@/domain/blog/enterprise/entities/topic-post";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PostTopicsEntity } from "./post-topics";

@Entity("topics")
export class TopicEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  name: string;

  @Column({
    unique: true,
    type: "text",
  })
  slug: string;

  @OneToMany(() => PostTopicsEntity, (postTopic) => postTopic.topic)
  postTopics?: PostTopicsEntity[];
}
