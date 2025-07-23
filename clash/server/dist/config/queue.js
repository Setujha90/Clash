export const redisConnection = {
    host: process.env.REDIS_HOST, // Hostname of the Redis server
    port: 6379,
};
export const defaultQueueOptions = {
    removeOnComplete: {
        count: 20, // Number of completed jobs to keep in the queue
        age: 60 * 60 // 1 hour, // Age of completed jobs to keep in the queue
    },
    attempts: 3, // Number of attempts to retry a job if it fails
    backoff: {
        type: 'exponential', // Exponential backoff
        delay: 1000 // Initial delay of 1 second
    },
    removeOnFail: false, // Do not remove failed jobs from the queue
};
