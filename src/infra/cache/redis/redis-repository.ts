import { RedisClientType } from "redis";
import { CacheClient } from "../cache-client";
import { CacheRepository } from "../cache-repository";

export class RedisRepository implements CacheRepository {
  constructor(private readonly redisClient: CacheClient<RedisClientType>) {}
  async delete(key: string): Promise<void> {
    this.redisClient.getClient().del(key);
  }
  async get(key: string): Promise<string | null> {
    return this.redisClient.getClient().get(key);
  }
  async set(key: string, value: any): Promise<void> {
    this.redisClient.getClient().set(key, value);
  }
}
