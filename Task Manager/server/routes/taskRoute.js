const express = require('express');
const { createTask,
    deleteTask,
    getAllTask,
    updateTask, 
    getSingleTask} = require('../controllers/taskController');
const router = express.Router();

router.route('/tasks/:id').post(createTask);
router.route('/tasks/:id').delete(deleteTask);
router.route('/tasks/:id').get(getAllTask);
router.route('/tasks/:id').get(getAllTask);
router.route('/tasks/single/:id').get(getSingleTask);
router.route('/tasks/:id').patch(updateTask);

module.exports = router;