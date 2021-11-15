const express = require("express");
const router = express.Router();
const { fetchOrderbook } = require("../middleware/fetchOrderbook.middleware");

router.get("/", fetchOrderbook);

module.exports = router;
