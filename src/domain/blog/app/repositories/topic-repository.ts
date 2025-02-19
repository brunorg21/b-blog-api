import { Topic } from "../../enterprise/entities/topic";

export interface TopicRepository {
  save(topic: Topic): Promise<Topic>;
  getById(topicId: string): Promise<Topic | null>;
  getAll(): Promise<Topic[]>;
  update(topic: Topic): Promise<void>;
  delete(topic: Topic): Promise<void>;
}
