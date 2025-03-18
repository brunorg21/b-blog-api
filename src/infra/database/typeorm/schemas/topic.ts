import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    type: "text",
  })
  slug: string;

  @OneToMany(() => PostTopicsEntity, (postTopic) => postTopic.topic)
  postTopics?: PostTopicsEntity[];
}
