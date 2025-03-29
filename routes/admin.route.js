import express from "express";
import { verifyRole, verifyToken } from "../middleware/auth.middleware.js";
import { deleteAccount } from "../controllers/user.controller.js";
import { createADmin } from "../controllers/admin.controller.js";
const adminRouter = express.Router();
adminRouter.route("/admin/register").post(createADmin);
adminRouter
  .route("/admin/deleteuser/:id")
  .delete(verifyToken, verifyRole, deleteAccount);
export default adminRouter;
