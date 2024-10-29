import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PostEntity } from "./post";
import { BloggerEntity } from "./blogger";

@Entity("comments")
export class CommentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  content: string;

  @Column({
    type: "uuid",
  })
  authorId: string;

  @Column({
    default: 0,
    type: "int",
  })
  likeCount: number;

  @Column({
    type: "uuid",
  })
  postId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({
    name: "postId",
  })
  post: PostEntity;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.comments)
  @JoinColumn({
    name: "authorId",
  })
  author: BloggerEntity;
}
