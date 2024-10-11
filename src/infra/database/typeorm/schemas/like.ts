import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class LikeEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
  })
  postId: string;

  @Column()
  authorId: string;

  @Column({
    nullable: true,
  })
  commentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;
}
