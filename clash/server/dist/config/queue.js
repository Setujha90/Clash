export const redisConnection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    password: process.env.REDIS_PASSWORD,
    // If you want to use a URL, you need to create an IORedis instance directly instead of using ConnectionOptions
};
// export const redisConnection: ConnectionOptions = new IORedis.default({
//   host: process.env.REDIS_HOST,
//   port: 6379,
//   maxLoadingRetryTime: null,
//   maxRetriesPerRequest: null,
// });
export const defaultQueueConfig = {
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
