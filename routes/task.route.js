import express from "express"
import { createTask, deleteTask, getAllTask, getTaskByCategory, getUserTaskById, updateTask } from "../controllers/task.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const taskRouter = express.Router()

taskRouter.route("/task").post(verifyToken, createTask)
taskRouter.route("/task").get(verifyToken, getAllTask)
taskRouter.route("/task/category/:category").get(verifyToken, getTaskByCategory)
taskRouter.route("/task/:id").get(verifyToken, getUserTaskById)
taskRouter.route("/task/:id").put(verifyToken, updateTask)
taskRouter.route("/task/:id").delete(verifyToken, deleteTask)

export default taskRouter