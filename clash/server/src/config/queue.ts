import { ConnectionOptions, DefaultJobOptions } from "bullmq";
import IORedis from "ioredis";

export const redisConnection: ConnectionOptions = {
    host: 'redis-10887.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: 10887,
    password: 'yfjBFe8fU3r4OGTP05ewj1wy2PAKhBsd',
    // If you want to use a URL, you need to create an IORedis instance directly instead of using ConnectionOptions
};

// export const redisConnection: ConnectionOptions = new IORedis.default({
//   host: process.env.REDIS_HOST,
//   port: 6379,
//   maxLoadingRetryTime: null,
//   maxRetriesPerRequest: null,
// });

export const defaultQueueConfig: DefaultJobOptions = {
  removeOnComplete: {
    count: 20,
    age: 60 * 60,
  },
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000,
  },
};
