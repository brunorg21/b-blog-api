import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TopicEntity } from "./topic";
import { PostEntity } from "./post";

@Entity("post_topics")
export class PostTopicsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "uuid",
  })
  postId: string;

  @Column({
    type: "uuid",
  })
  topicId: string;

  @ManyToOne(() => TopicEntity, (topic) => topic.postTopics, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "topicId" })
  topic: TopicEntity;

  @ManyToOne(() => PostEntity, (post) => post.postTopics, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "postId" })
  post: PostEntity;
}
