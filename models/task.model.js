import mongoose, { Schema } from "mongoose";
import { customError } from "../middleware/error.middleware.js";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["complete", "incomplete", "pending"],
    default: "pending",
  },
  category: { type: String, required: true },
  dueDate: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

TaskSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const userModel = mongoose.model("user");
      const user = await userModel.findById(this.userId);
      const { tasks, ...others } = user;
      let targetTask = tasks.findIndex(
        (item) => item.toString() === this._id.toString()
      );
      tasks.splice(targetTask, 1);
      await user.save();
    } catch (err) {
      return customError(500, "Error removing task id from user's profile");
    }
  }
);

TaskSchema.post("save", async function (doc) {
  try {
    const userModel = mongoose.model("user");
    const user = await userModel.findById(doc.userId);
    const { tasks, ...others } = user;
    tasks.push(doc._id);
    await user.save();
  } catch (err) {
    return customError(500, "Error updating user after added task");
  }
});

const taskModel = new mongoose.model("task", TaskSchema);
export default taskModel;

// {
//    " title": ""
// "description": ""
// "status": ""
// "category": ""
// "dueDate": ""
// }
