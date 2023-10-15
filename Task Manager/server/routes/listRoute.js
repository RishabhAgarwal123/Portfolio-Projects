const express = require('express');
const { createList,
    deleteList,
    getAllList,
    updateList } = require('../controllers/listController');
const router = express.Router();

router.route('/list').post(createList);
router.route('/list/:id').delete(deleteList);
router.route('/list').get(getAllList);
router.route('/list/:id').patch(updateList);

module.exports = router;