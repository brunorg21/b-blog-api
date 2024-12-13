import { env } from "@/env";
import { createClient, RedisClientType } from "redis";
import { CacheClient } from "../cache-client";

export class RedisClient implements CacheClient<RedisClientType> {
  private redisClient: RedisClientType;
  private static instance: RedisClient;

  constructor() {
    this.redisClient = createClient({
      url: env.REDIS_URL,
    });

    this.connect()
  }
  getClient(): RedisClientType {
    return this.redisClient;
  }
  static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  get client() {
    return this.redisClient;
  }

  async connect() {
    this.redisClient.on("error", (err) => {
      console.log("Redis Client Error", err);
    });

    this.redisClient.on("connect", () => {
      console.log("Redis Client connected");
    });

    await this.redisClient.connect();
  }

  async disconnect() {
    await this.redisClient.disconnect();
  }
}
