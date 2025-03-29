import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: [process.env.USERHASHEDCODE, process.env.ADMINHASHEDCODE],
      default: process.env.USERHASHEDCODE,
    },
    email: { type: String, required: true },
    password: { type: String, require: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
  },
  { timestamps: true }
);

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const taskModel = mongoose.model("task");
      await taskModel.deleteMany({ userId: this._id });
    } catch (err) {
      next(err);
    }
  }
);

const userModel = new mongoose.model("user", userSchema);
export default userModel;
