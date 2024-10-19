import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
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
  })
  readAt: Date;
}
