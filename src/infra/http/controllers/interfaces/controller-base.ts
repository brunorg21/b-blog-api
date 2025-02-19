export interface ControllerBase<T> {
  create(data: T): Promise<void>;
  createTopic?(data: T[]): Promise<{ topics: T[] }>;
  get?(): Promise<T[]>;
  update(data: T, bloggerId?: string): Promise<void>;
  delete(id: string, bloggerId?: string): Promise<void>;
}
