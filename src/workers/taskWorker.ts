import dotenv from "dotenv";
dotenv.config();
import { Worker } from "bullmq";
import redisConnection from "../services/redis";
import prisma from "../prisma";

const worker = new Worker(
  "task-processing",

  async (job) => {
    console.log("Processing job:", job.id);

    const { taskId, text } = job.data;

    // Simulate heavy processing
    await new Promise((resolve) =>
      setTimeout(resolve, 5000)
    );

    const result = `
Processed Text:
${text}

Word Count: ${text.split(" ").length}
`;

    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: "completed",
        result,
      },
    });

    console.log("Task completed:", taskId);
  },

  {
    connection: redisConnection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed`);

  console.log(err);
});