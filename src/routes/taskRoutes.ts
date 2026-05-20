import { Router } from "express";

import {
  createTask,
  getTasks,
} from "../controllers/taskController";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);

export default router;