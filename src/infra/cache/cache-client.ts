export interface CacheClient<T> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): T;
}
