const express = require("express");
const router = express.Router();
const { limitOrderHandler } = require("../middleware/limitOrder.middleware");

router.post("/limitorder", limitOrderHandler);

module.exports = router;
