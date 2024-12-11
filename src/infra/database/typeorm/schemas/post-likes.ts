import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { PostEntity } from "./post";
import { BloggerEntity } from "./blogger";

@Entity("post_likes")
export class PostLikeEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "uuid",
  })
  bloggerId: string;

  @Column({
    type: "uuid",
  })
  postId: string;

  @CreateDateColumn()
  likedAt?: Date;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.likes)
  @JoinColumn({ name: "bloggerId" })
  blogger?: BloggerEntity;

  @ManyToOne(() => PostEntity, (post) => post.likes)
  @JoinColumn({ name: "postId" })
  post?: PostEntity;
}
