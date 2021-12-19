const express = require("express");
const router = express.Router();

router.use("/api/products", require('./product'));
router.use("/api/categories", require('./category'));
module.exports = router;
