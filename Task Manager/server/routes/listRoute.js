const express = require('express');
const { createList,
    deleteList,
    getAllList,
    updateList } = require('../controllers/listController');
const router = express.Router();

router.route('/lists').post(createList);
router.route('/lists/:id').delete(deleteList);
router.route('/lists').get(getAllList);
router.route('/lists/:id').patch(updateList);

module.exports = router;