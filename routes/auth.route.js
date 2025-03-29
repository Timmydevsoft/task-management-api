import express from "express";
import { refreshToken, signIn } from "../controllers/auth.controller.js";
import { verifyCookie } from "../middleware/auth.middleware.js";
const authRouter = express.Router();
authRouter.route("/login").post(signIn);
authRouter.route("/refresh").get(verifyCookie, refreshToken);
export default authRouter;
