const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  side: {
    type: String,
    lowercase: true,
    match: /(?:^|\W)buy(?:$|\W)|(?:^|\W)sell(?:$|\W)/i,
    required: true,
    message: "Please specify order type as 'buy' or 'sell'.",
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
    uppercase: true,
    required: [true, "Please specify the currency pair of your order."],
  },
});

const orderbookSchema = new mongoose.Schema({
  Asks: [orderSchema],
  Bids: [orderSchema],
  LastChanged: { type: Date, default: Date.now },
});

/**
 * youtube: node auth tutorial jwt #6
 */

//run function before document is saved to db.
orderbookSchema.pre("validate", function (next) {
  // console.log("New order about to be created", this.side);
  /buy/gi.test(this.side)
    ? console.log("it's a bid!")
    : // : this.side === "asks"
      console.log("it's an ask!");
  // : "Please specify order type as 'buy' or 'sell'";
  next();
});

//run function after document is saved to db
orderbookSchema.post("save", (doc, next) => {
  console.log("New order was saved and created", doc);
  next();
});

module.exports = mongoose.model("orderbook", orderbookSchema);
