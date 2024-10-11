import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
}
