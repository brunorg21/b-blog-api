import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BloggerCommunityEntity } from "./blogger-community";
import { BloggerEntity } from "./blogger";

@Entity("community_bloggers")
export class CommunityBloggerEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "uuid",
  })
  bloggerCommunityId: string;

  @Column({
    type: "uuid",
  })
  bloggerId: string;

  @ManyToOne(
    () => BloggerCommunityEntity,
    (community) => community.communityBloggers,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "bloggerCommunityId" })
  bloggerCommunity?: BloggerCommunityEntity;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.communityBloggers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "bloggerId" })
  blogger?: BloggerEntity;
}
