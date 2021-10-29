const express = require("express");
const router = express.Router();
const OrderModel = require("../../database/models/order.model");

//Getting the whole orderbook
router.get("/", async (req, res) => {
  try {
    //fetch data once into a temp constant, then find from it to sort before responding
    const orderbook = {
      Asks: await OrderModel.find({ side: "sell" })
        .select("-_id -__v")
        .sort("price"),
      Bids: await OrderModel.find({ side: "buy" })
        .select("-_id -__v")
        .sort("-price"),
    };

    res.json(orderbook);
  } catch {
    (err) => {
      res.status(500).json({ message: err.message });
    };
  }
});

module.exports = router;
