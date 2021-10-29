const OrderModel = require("../models/order.model");
const TradeHistoryModel = require("../models/tradehistory.model");

module.exports.saveOrder = async () => {
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

module.exports.updateOrder = (updateOrder) => {
  const similarOrderQuery = { price: req.body.price };
  OrderModel.findOneAndUpdate(similarOrderQuery, updateOrder, {
    returnNewDocument: true,
  })
    .then(() => console.log("Order updated"))
    .catch((err) =>
      console.error(`Failed to find and update document: ${err}`)
    );
};

module.exports.saveTrade = async (tradeLog) => {
  try {
    const newTrade = new TradeHistoryModel(tradeLog);

    await newTrade.save((err, doc) => {
      if (err) res.send(err);
    });

    await OrderModel.deleteOne({ quantity: 0 });

    res.status(201).json("limit order has been added and processed!");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
