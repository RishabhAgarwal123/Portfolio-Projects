const express = require('express');
const { createList,
    deleteList,
    getAllList,
    updateList, 
    getSingleList} = require('../controllers/listController');
const { isAuthenticated } = require('../middlewares/sessionMiddleware');
const router = express.Router();

router.route('/lists').post(isAuthenticated, createList);
router.route('/lists/:id').delete(isAuthenticated, deleteList);
router.route('/lists').get(isAuthenticated, getAllList);
router.route('/lists/:id').get(isAuthenticated, getSingleList);
router.route('/lists/:id').patch(isAuthenticated, updateList);

module.exports = router;