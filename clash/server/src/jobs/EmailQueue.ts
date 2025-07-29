import { Job, Queue, Worker } from "bullmq";
import { defaultQueueConfig, redisConnection } from "../config/queue.js";
import { sendMail } from "../config/mail.js";

export const emailQueueName = "emailQueue";

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueConfig,
});
console.log(`Email queue created: ${JSON.stringify(redisConnection, null, 2)});}`);
// * Workers
export const handler = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data = job.data;
    await sendMail(data.to, data.subject, data.html);
  },
    { connection: redisConnection }
);

console.log(`Email worker started for queue: ${handler.name} with connection: ${JSON.stringify(redisConnection, null, 2)}`);
