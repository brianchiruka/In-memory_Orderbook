const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  side: {
    type: String,
    required: true,
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
});

module.exports = model("Order", orderSchema);
