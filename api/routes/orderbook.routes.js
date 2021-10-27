const express = require("express");
const router = express.Router();
const Order = require("../../database/models/orderbook.model");

//Getting the whole orderbook
router.get("/", async (req, res) => {
  try {
    //fetch data once into a temp constant, then find from it to sort before responding
    const orderbook = {
      Asks: await Order.find({ side: "sell" }).select("-_id -__v"),
      Bids: await Order.find({ side: "buy" }).select("-_id -__v"),
    };
    res.json(orderbook);
  } catch {
    (err) => res.status(500).json({ message: err.message });
  }
});
//Placing a limit order
router.post("/limitorder", async (req, res) => {
  const order = new Order({
    side: req.body.side,
    quantity: req.body.quantity,
    price: req.body.price,
    currencyPair: req.body.currencyPair,
  });
  console.log(order);
  try {
    const newOrder = await order.save((err, doc) => {
      if (err) res.send(err);
    });

    res.status(201).json("should be done go and check");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Fetching by filter
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

//Delete limit order
// router.delete("/:id", (req, res) => {
//   req.params.id;
// });

/***
 * FOR TESTING PURPOSES
 */
//Delete limit order
router.delete("/throwawaythedata", async (req, res) => {
  const newOrderbook = await Order.deleteMany();
  res.send(newOrderbook);
});

module.exports = router;
