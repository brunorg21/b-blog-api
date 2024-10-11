import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostTopicsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  postId: string;

  @Column()
  topicId: string;
}
