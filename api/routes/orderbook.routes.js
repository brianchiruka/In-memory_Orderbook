const express = require("express");
const router = express.Router();
const OrderModel = require("../../database/models/order.model");
const TradeHistoryModel = require("../../database/models/tradehistory.model");
const {
  saveOrder,
  updateOrder,
  saveTrade,
} = require("../../database/helpers/limitorder.helperFunctions");

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

//Getting the trade history
router.get("/tradehistory", async (req, res) => {
  try {
    const tradeHistory = await TradeHistoryModel.find();
    res.json(tradeHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Placing a limit order
router.post("/limitorder", async (req, res) => {
  //
  //test price here
  //
  OrderModel.findOne({ price: req.body.price })
    .then((matchedOrderByPrice) => {
      if (matchedOrderByPrice == null) {
        saveOrder();

        console.log("Unique order saved!");
      } else {
        let updateOrderQuery = {};
        if (matchedOrderByPrice.side === req.body.side) {
          updateOrderQuery = {
            $inc: { quantity: req.body.quantity, orderCount: 1 },
          };
          updateOrder(updateOrderQuery);
        } else {
          updateOrderQuery = { $inc: { quantity: -req.body.quantity } };
          updateOrder(updateOrderQuery);
          const tradeLog = {
            price: matchedOrderByPrice.price,
            quantity: matchedOrderByPrice.quantity,
            currencyPair: matchedOrderByPrice.currencyPair,
            takerSide: req.body.side,
          };
          saveTrade(tradeLog);
        }
      }
    })
    .catch((err) => console.error(err));
});

//Fetching by filter
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

/***
 * FOR TESTING PURPOSES
 */
//Delete limit order
router.delete("/throwawaythedata", async (req, res) => {
  const newOrderbook = await OrderModel.deleteMany();
  res.send(newOrderbook);
});

module.exports = router;
