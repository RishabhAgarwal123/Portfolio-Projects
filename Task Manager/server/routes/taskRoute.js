const express = require('express');
const { createTask,
    deleteTask,
    getAllTask,
    updateTask, 
    getSingleTask} = require('../controllers/taskController');
const { isAuthenticated } = require('../middlewares/sessionMiddleware');
const router = express.Router();

router.route('/tasks/:id').post(isAuthenticated, createTask);
router.route('/tasks/:id').delete(isAuthenticated, deleteTask);
router.route('/tasks/:id').get(isAuthenticated, getAllTask);
router.route('/tasks/:id').get(isAuthenticated, getAllTask);
router.route('/tasks/single/:id').get(isAuthenticated, getSingleTask);
router.route('/tasks/:id').patch(isAuthenticated, updateTask);

module.exports = router;