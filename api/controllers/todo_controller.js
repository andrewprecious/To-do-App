const Task = require("../models/task_model");
const User = require("../models/auth_model");
// const Category = require("../models/category_model");
const mongoose = require("mongoose");

const createTask = async (req, res) => {
  const { userId } = req.params; // Destructure userId from the URL parameters
  console.log("User ID:", userId);

  // Check if the userId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const { title } = req.body;

  console.log("Request Body:", req.body);

  // Check if all required fields are present
  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  try {
    // Create the new task
    const newTask = new Task({
      userId,
      title,
    });

    // Save the task to the database
    const saveTodo = await newTask.save();
    console.log("Task created:", saveTodo);

    // push the todo id into the user array
    await User.findByIdAndUpdate(userId, {
      $push: { tasks: saveTodo._id },
    });

    // Send the newly created task back to the frontend
    res.status(200).json(saveTodo);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

const getAllTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Fetch tasks for the userId from the database
    const tasks = await Task.find({ userId: userObjectId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    return res.status(200).json(tasks); // Return the tasks
  } catch (err) {
    // console.error("Error fetching tasks:", err);
    return res
      .status(500)
      .json({ message: "Error fetching tasks. Please try again." });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Check if the userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(404).json({ message: "invalid task id" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(404).json({ message: "Invalid task id" });
    }

    // step 1: remove it from task array
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Step 2: Remove the task reference from the user's 'tasks' array
    await User.updateOne(
      { _id: task.userId }, // Find the user who owns the task
      { $pull: { tasks: taskId } } // Remove the task ID from the user's 'tasks' array
    );

    res.status(200).json({ message: "Task has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  editTask,
  deleteTask,
  getSingleTask,
};
