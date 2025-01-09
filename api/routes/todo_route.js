const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/authMiddleware");
// const verifyToken = require("../middleware/verifyToken");

const {
  createTask,
  editTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
} = require("../controllers/todo_controller");

router.post("/createTask/:userId", createTask);
router.get("/getAllTasks/:userId", getAllTasks);
router.get("/task/:taskId", getSingleTask);
router.put("/editTask/:taskId", editTask);
router.delete("/deleteTask/:taskId", deleteTask);
// router.post("/createCategory", createCategory);

module.exports = router;
