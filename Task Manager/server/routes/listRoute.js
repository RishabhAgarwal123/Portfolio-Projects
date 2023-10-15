const express = require('express');
const { createList,
    deleteList,
    getAllList,
    updateList, 
    getSingleList} = require('../controllers/listController');
const router = express.Router();

router.route('/lists').post(createList);
router.route('/lists/:id').delete(deleteList);
router.route('/lists').get(getAllList);
router.route('/lists/:id').get(getSingleList);
router.route('/lists/:id').patch(updateList);

module.exports = router;