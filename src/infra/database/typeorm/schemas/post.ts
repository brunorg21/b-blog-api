import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BloggerEntity } from "./blogger";
import { CommentEntity } from "./comment";

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: "uuid",
  })
  authorId: string;

  @Column({
    nullable: true,
    type: "uuid",
  })
  bloggerCommunityId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.posts)
  @JoinColumn({ name: "authorId" })
  author: BloggerEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
