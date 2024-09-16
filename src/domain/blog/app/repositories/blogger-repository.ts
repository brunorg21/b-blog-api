import { Blogger } from "../../enterprise/entities/blogger";

export interface BloggerRepository {
  save(blogger: Blogger): Promise<void>;
  getById(id: string): Promise<Blogger | null>;
  getAll(): Promise<Blogger[]>;
  update(blogger: Blogger): Promise<void>;
  findByEmail(email: string): Promise<Blogger | null>;
  delete(blogger: Blogger): Promise<void>;
}
