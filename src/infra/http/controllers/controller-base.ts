export interface ControllerBase<T> {
  create(data: T): Promise<void>;
  get?(): Promise<T[]>;
  update(id: string, data: T): Promise<void>;
  delete(id: string): Promise<void>;
}
