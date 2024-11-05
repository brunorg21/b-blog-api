import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BloggerEntity } from "./blogger";

@Entity("notifications")
export class NotificationEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  message: string;

  @Column({
    type: "uuid",
  })
  senderId: string;

  @Column({
    type: "uuid",
  })
  recipientId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
    type: "date",
  })
  readAt: Date | null;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.posts)
  @JoinColumn({ name: "senderId" })
  sender?: BloggerEntity;

  @ManyToOne(() => BloggerEntity, (blogger) => blogger.posts)
  @JoinColumn({ name: "recipientId" })
  recipient?: BloggerEntity;
}
