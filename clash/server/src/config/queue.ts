import { ConnectionOptions, DefaultJobOptions } from "bullmq"; // Importing ConnectionOptions from bullmq ,used for configuring the connection to the Redis server

export const redisConnection: ConnectionOptions = { // Configuration for connecting to Redis server 
    url: process.env.REDIS_URL, // URL of the Redis server
}

export const defaultQueueOptions: DefaultJobOptions = { // Default options for jobs in the queue to how long a job can run before it is considered failed,or we need to hold it in the queue 
    removeOnComplete: {// Remove completed jobs from the queue
        count: 20, // Number of completed jobs to keep in the queue
        age: 60 * 60 // 1 hour, // Age of completed jobs to keep in the queue
    },
    attempts: 3, // Number of attempts to retry a job if it fails
    backoff: { // Backoff strategy for retrying failed jobs
        type: 'exponential', // Exponential backoff
        delay: 1000 // Initial delay of 1 second
    },
    removeOnFail: false, // Do not remove failed jobs from the queue


}