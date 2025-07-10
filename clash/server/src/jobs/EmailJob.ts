import {Job, Queue, Worker} from 'bullmq'; // Importing Queue and Worker from bullmq, used for creating and processing jobs in the queue
import { defaultQueueOptions,redisConnection } from '../config/queue.js';
import { sendEmail } from '../config/mail.js';

export const emailQueueName = "emailQueue"; // Name of the email queue

interface EmailJobData { // Interface for the data structure of jobs in the email queue
    to: string; 
    subject: string; 
    body: string; 
}

export const emailQueue = new Queue(emailQueueName,  // Creating a new queue for email jobs
    {
        connection: redisConnection, // Connection to the Redis server
        defaultJobOptions: defaultQueueOptions, // Default options for jobs in the queue
    }
)

// Worker to process email jobs from the email queue

export const emailWorker = new Worker(emailQueueName, async (job:Job) => {
    const data:EmailJobData = job.data;
    await sendEmail(data.to, data.subject, data.body); // Sending email using the sendEmail function
},
{
    connection: redisConnection, // Connection to the Redis server
}
);