const express = require("express");
const router = express.Router();
const TradeHistoryModel = require("../../database/models/tradehistory.model");

//Getting the trade history
router.get("/tradehistory", async (req, res) => {
  try {
    const tradeHistory = await TradeHistoryModel.find().select("-__v");
    res.json(tradeHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
