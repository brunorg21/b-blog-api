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

  @Column()
  senderId: string;

  @Column()
  recipientId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  readAt: Date;
}
