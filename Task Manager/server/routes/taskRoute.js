const express = require('express');
const { createTask,
    deleteTask,
    getAllTask,
    updateTask } = require('../controllers/taskController');
const router = express.Router();

router.route('/Task').post(createTask);
router.route('/Task/:id').delete(deleteTask);
router.route('/Task').get(getAllTask);
router.route('/Task/:id').patch(updateTask);

module.exports = router;