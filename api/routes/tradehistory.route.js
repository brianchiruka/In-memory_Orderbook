const express = require("express");
const router = express.Router();
const {
  fetchTradeHistory,
} = require("../middleware/fetchTradeHistory.middleware.js");

router.get("/tradehistory", fetchTradeHistory);

module.exports = router;
