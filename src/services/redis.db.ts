import 'dotenv/config';
import Redis from 'ioredis';

export const redis = new Redis({
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  host: process.env.REDIS_ROUTE || '127.0.0.1',
  username: 'default',
  password: 'default',
  db: 0,
});
