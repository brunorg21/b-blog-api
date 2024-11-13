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
import { BloggerCommunityEntity } from "./blogger-community";

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
  bloggerCommunityId: string | null;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date | null;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.posts)
  @JoinColumn({ name: "authorId" })
  author?: BloggerEntity;

  @ManyToOne(() => BloggerCommunityEntity, (blogger) => blogger.posts)
  @JoinColumn({ name: "bloggerCommunityId" })
  bloggerCommunity?: BloggerCommunityEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments?: CommentEntity[];

  @OneToMany(() => PostTopicsEntity, (postTopic) => postTopic.post)
  postTopics?: PostTopicsEntity[];
}
