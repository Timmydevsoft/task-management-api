import taskModel from "../models/task.model.js";

const createTask = async (req, res, next) => {
  try {
    const { title, description, category, dueDate } = req.body;
    if (!title || !description || !category || !dueDate) {
      return res.status(403).json({ message: "All field requred" });
    }
    console.log(dueDate);

    const isoDate = new Date(dueDate);
    const newTask = new taskModel({
      title,
      description,
      category,
      dueDate: isoDate,
      userId: req.id,
    });
    await newTask.save();
    return res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    next(err);
  }
};

// This only get all task created by that particular user
const getAllTask = async (req, res, next) => {
  try {
    const tasks = await taskModel.find({ userId: req.id }).lean();
    if (tasks.length < 1) {
      return res.status(404).json({ message: "You dont have any task yet" });
    }
    const taskWithFormatedDate = tasks.map((item) => {
      return {
        ...item,
        dueDate: new Date(item.dueDate).toISOString().split("T")[0],
      };
    });

    return res.status(200).json(taskWithFormatedDate);
  } catch (err) {
    next(err);
  }
};

const getUserTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id).lean();
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.id.toString()) {
      return res.status(401).json({ message: "You can ony get your own task" });
    }
    return res
      .status(200)
      .json({
        ...task,
        dueDate: new Date(task.dueDate).toISOString().split("T")[0],
      });
  } catch (err) {
    next(err);
  }
};

const getTaskByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const tasks = await taskModel
      .find({ category: category, userId: req.id })
      .lean();
    if (tasks.length < 1) {
      return res
        .status(404)
        .json({ message: "You dont have any task of that category" });
    }
    const formatedTake = tasks.map((item) => {
      return {
        ...item,
        dueDate: new Date(item.dueDate).toISOString().split("T")[0],
      };
    });
    return res.status(200).json(formatedTake);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const { title, description, category, status, dueDate } = req.body;
    if (!title || !description || !category || !dueDate) {
      return res.status(403).json({ message: "All field required" });
    }
    if (task.userId.toString() !== req.id.toString()) {
      return res
        .status(401)
        .json({ message: "You can only update your own task" });
    }

    const validStatus = ["complete", "incomplete", "pending"].includes(status);
    if (!validStatus) {
      return res.status(403).json({ message: "Invalid status" });
    }

    const update = await taskModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          category,
          dueDate,
          status,
        },
      },
      { new: true }
    );
    return res.status(200).json(update);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId.toString() !== req.id.toString()) {
      return res
        .status(401)
        .json({ message: "You can only delete your own task" });
    }
    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export {
  createTask,
  getAllTask,
  getUserTaskById,
  getTaskByCategory,
  updateTask,
  deleteTask,
};
