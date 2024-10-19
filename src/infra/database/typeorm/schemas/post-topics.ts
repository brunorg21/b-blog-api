import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostTopicsEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "uuid",
  })
  postId: string;

  @Column({
    type: "uuid",
  })
  topicId: string;
}
