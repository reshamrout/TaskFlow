const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/auth");

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/Task');

router.post("/createTask", auth, createTask);
router.get("/getAllTasks", auth, getAllTasks);
router.get("/:id", auth, getTaskById);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
