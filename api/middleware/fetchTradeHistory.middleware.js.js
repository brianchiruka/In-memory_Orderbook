const TradeHistoryModel = require("../../database/models/tradehistory.model");

exports.fetchTradeHistory = async (req, res) => {
  try {
    const tradeHistory = await TradeHistoryModel.find().select("-__v");
    res.json(tradeHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
