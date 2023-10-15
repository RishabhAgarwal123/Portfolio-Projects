const express = require('express');
const { createTask,
    deleteTask,
    getAllTask,
    updateTask } = require('../controllers/taskController');
const router = express.Router();

router.route('/tasks').post(createTask);
router.route('/tasks/:id').delete(deleteTask);
router.route('/tasks').get(getAllTask);
router.route('/tasks/:id').patch(updateTask);

module.exports = router;