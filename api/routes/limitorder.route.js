const express = require("express");
const router = express.Router();
const OrderModel = require("../../database/models/order.model");
const TradeHistoryModel = require("../../database/models/tradehistory.model");

router.post("/limitorder", async (req, res) => {
  // now check if a similar price already exists and decide whether to save it or update orderbook
  OrderModel.findOne({ price: req.body.price })
    .then((matchedOrderByPrice) => {
      if (matchedOrderByPrice == null) {
        saveOrder();

        console.log("Unique order saved!");
      } else {
        let updateOrderQuery = {};

        //check if sides are the same to either perform a trade or just update orderbook
        if (matchedOrderByPrice.side === req.body.side) {
          updateOrderQuery = {
            $inc: { quantity: req.body.quantity, orderCount: 1 },
          };

          updateOrder(updateOrderQuery);
        } else {
          saveTrade(matchedOrderByPrice);
        }
      }
    })
    .catch((err) => console.error(err));

  /**
   * Defining some helper functions as used above:
   *
   * saveOrder(): simply saves the request body,
   * updateOrder(): update the order quantity on the document with price that matches request price.
   * and saveTrade(): runs updateOrder() to decrement the quantity of the order then logs the trade in TradeHistoryModel
   *
   *  */

  const saveOrder = async () => {
    try {
      const newOrder = new OrderModel(req.body);

      await newOrder.save((err, doc) => {
        if (err) res.send(err);
      });

      res.status(201).json(`id: ${newOrder._id}`);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  const updateOrder = (updateOrder) => {
    const similarOrderQuery = { price: req.body.price };
    OrderModel.findOneAndUpdate(similarOrderQuery, updateOrder, {
      returnNewDocument: true,
    })
      .then(() => console.log("Order updated"))
      .catch((err) =>
        console.error(`Failed to find and update document: ${err}`)
      );
  };

  const saveTrade = async (matchedOrderByPrice) => {
    updateOrderQuery = { $inc: { quantity: -req.body.quantity } };
    updateOrder(updateOrderQuery);

    const recentTradeLog = {
      price: matchedOrderByPrice.price,
      quantity: req.body.quantity,
      currencyPair: matchedOrderByPrice.currencyPair,
      takerSide: req.body.side,
    };

    try {
      const newTrade = new TradeHistoryModel(recentTradeLog);

      await newTrade.save((err, doc) => {
        if (err) res.send(err);
      });

      await OrderModel.deleteOne({ quantity: { $lte: 0 } }); //remove limit order that has been satisfied,

      res.status(201).json("limit order has been added and processed!");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
});

module.exports = router;
