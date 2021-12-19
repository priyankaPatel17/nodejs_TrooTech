const express = require('express');
const router = express.Router();
const commonProductController = require('../../controllers/common/product');

router.route('/all').post(commonProductController.getAllProducts);
router.route('/create').post(commonProductController.add);
router.route('/update/:id').put(commonProductController.update);
router.route('/delete/:id').delete(commonProductController.delete);

module.exports = router;