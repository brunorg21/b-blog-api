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

@Entity()
export class BloggerCommunityEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  description: string;

  @Column({
    type: "uuid",
  })
  authorId: string;

  @Column({
    nullable: true,
  })
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.bloggerCommunities)
  @JoinColumn({ name: "authorId" })
  author: BloggerEntity;

  @OneToMany(
    () => CommunityBloggerEntity,
    (communityBlogger) => communityBlogger.bloggerCommunity
  )
  communityBloggers: CommunityBloggerEntity[];
}
