import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PostEntity } from "./post";
import { BloggerCommunityEntity } from "./blogger-community";
import { CommentEntity } from "./comment";
import { CommunityBloggerEntity } from "./community-blogger";

@Entity()
export class BloggerEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    enum: ["ADMIN", "COMMON"],
    default: "COMMON",
  })
  role: string;

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

  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];

  @OneToMany(
    () => BloggerCommunityEntity,
    (bloggerCommunity) => bloggerCommunity.author
  )
  bloggerCommunities: BloggerCommunityEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: CommentEntity[];

  @OneToMany(
    () => CommunityBloggerEntity,
    (communityBlogger) => communityBlogger.blogger
  )
  communityBloggers: CommunityBloggerEntity[];
}
