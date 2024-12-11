import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { CommentEntity } from "./comment";
import { BloggerEntity } from "./blogger";

@Entity("comment_likes")
export class CommentLikeEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "uuid",
  })
  bloggerId: string;

  @Column({
    type: "uuid",
  })
  commentId: string;

  @CreateDateColumn()
  likedAt?: Date;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.likes)
  @JoinColumn({ name: "bloggerId" })
  blogger?: BloggerEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.likes)
  @JoinColumn({ name: "commentId" })
  comment?: CommentEntity;
}
