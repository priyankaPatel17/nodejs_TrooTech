const express = require('express');
const router = express.Router();
const commonCategoryController = require('../../controllers/common/category');

router.route('/all').post(commonCategoryController.getAllCategories);
router.route('/create').post(commonCategoryController.add);
router.route('/update/:id').put(commonCategoryController.update);
router.route('/delete/:id').delete(commonCategoryController.delete);

module.exports = router;