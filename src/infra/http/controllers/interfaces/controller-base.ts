export interface ControllerBase<T> {
  create(data: T): Promise<void>;
  get?(): Promise<T[]>;
  update(data: T): Promise<void>;
  delete(id: string, bloggerId?: string): Promise<void>;
}
