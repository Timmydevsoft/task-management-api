import express from "express"

import { createAccount, deleteAccount, updateProfile, viewAllUser, viewProfile } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"

const userRouter = express.Router()

userRouter.route("/register").post(createAccount)
userRouter.route("/user").get(verifyToken, viewAllUser)
userRouter.route("/user/:id").get(verifyToken, viewProfile)
userRouter.route("/user/:id").put(verifyToken, updateProfile)
userRouter.route("/user/:id").delete(verifyToken, deleteAccount)

export default userRouter