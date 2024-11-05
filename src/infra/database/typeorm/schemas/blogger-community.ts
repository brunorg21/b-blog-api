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
import { CommunityBloggerEntity } from "./community-blogger";

@Entity("blogger_communities")
export class BloggerCommunityEntity {
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

  @Column({
    type: "text",
  })
  description: string;

  @Column({
    type: "uuid",
  })
  authorId: string;

  @Column({
    nullable: true,
    type: "text",
  })
  avatarUrl: string | null;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date | null;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.bloggerCommunities)
  @JoinColumn({ name: "authorId" })
  author?: BloggerEntity;

  @OneToMany(
    () => CommunityBloggerEntity,
    (communityBlogger) => communityBlogger.bloggerCommunity
  )
  communityBloggers?: CommunityBloggerEntity[];
}
