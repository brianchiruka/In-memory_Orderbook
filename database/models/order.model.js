const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  side: {
    type: String,
    match: /(?:^|\W)buy(?:$|\W)|(?:^|\W)sell(?:$|\W)/i,
    required: true,
    message: "Please specify order type as 'buy' or 'sell'.",
    lowercase: true,
  },
  quantity: {
    type: Number,
    required: [true, "Please specify order quantity."],
  },
  price: {
    type: Number,
    index: true,
    required: [true, "Please specify order price."],
  },
  currencyPair: {
    type: String,
    required: [true, "Please specify the currency pair of your order."],
    uppercase: true,
  },
  orderCount: {
    type: Number,
    default: 1,
  },
});

module.exports = model("Order", orderSchema);
