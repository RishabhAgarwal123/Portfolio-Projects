const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middlewares/authMiddleware');

const {
    addTask,
    updateTask,
    deleteTask,
    getAllTask,
    getTask
} = require('../controllers/taskController');

// Routes all tasks
router.route('/tasks/new').post(isAuthenticatedUser, addTask);
router.route('/tasks/:id').put(isAuthenticatedUser, updateTask);
router.route('/tasks/:id').delete(isAuthenticatedUser, deleteTask);
router.route('/tasks').get(isAuthenticatedUser, getAllTask);
router.route('/tasks/:id').get(isAuthenticatedUser, getTask);

module.exports = router;