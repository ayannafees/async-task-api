import { Response } from "express";
import prisma from "../prisma";
import { AuthRequest } from "../middleware/authMiddleware";
import { taskQueue } from "../services/taskQueue";

export const createTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { text } = req.body;

    const task = await prisma.task.create({
      data: {
        text,
        userId: req.userId!,
      },
    });

    await taskQueue.add(
      "process-task",
      {
        taskId: task.id,
        text,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      }
    );

    res.json({
      message: "Task queued",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};