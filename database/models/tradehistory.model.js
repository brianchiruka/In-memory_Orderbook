const { Schema, model } = require("mongoose");

const tradeHistorySchema = new Schema({
  price: {
    type: Number,
    index: true,
  },
  quantity: {
    type: Number,
  },
  currencyPair: {
    type: String,
  },
  takerSide: {
    type: String,
    match: /(?:^|\W)buy(?:$|\W)|(?:^|\W)sell(?:$|\W)/i,
  },
  tradedAt: { type: Date, default: Date.now },
});

module.exports = model("TradeHistory", tradeHistorySchema);
