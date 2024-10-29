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
import { PostTopicsEntity } from "./post-topics";

@Entity("posts")
export class PostEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  title: string;

  @Column({
    type: "varchar",
    length: 500,
  })
  content: string;

  @Column({
    default: 0,
    type: "int",
  })
  likeCount: number;

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

  @OneToMany(() => PostTopicsEntity, (postTopic) => postTopic.post)
  postTopics: PostTopicsEntity[];
}
