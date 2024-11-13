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
import { NotificationEntity } from "./notification";

@Entity("blogger")
export class BloggerEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    type: "text",
  })
  name: string;

  @Column({
    unique: true,
    type: "text",
  })
  email: string;

  @Column({
    type: "text",
  })
  password: string;

  @Column({
    enum: ["ADMIN", "COMMON"],
    default: "COMMON",
    type: "text",
  })
  role?: string;

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
  updatedAt?: Date | null;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts?: PostEntity[];

  @OneToMany(
    () => BloggerCommunityEntity,
    (bloggerCommunity) => bloggerCommunity.author
  )
  bloggerCommunities?: BloggerCommunityEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments?: CommentEntity[];

  @OneToMany(
    () => CommunityBloggerEntity,
    (communityBlogger) => communityBlogger.blogger
  )
  communityBloggers?: CommunityBloggerEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.sender)
  notificationsSent?: CommunityBloggerEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.recipient)
  notificationsReceived?: CommunityBloggerEntity[];
}
