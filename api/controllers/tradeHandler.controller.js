const OrderModel = require("../../database/models/order.model");
const { trade } = require("./tradeAndUpdateOrderbook.controller");

exports.tradeHandler = async (newOrder) => {
  if (newOrder) {
    if (newOrder.side === "sell") {
      OrderModel.aggregate([
        { $match: { price: { $gte: newOrder.price }, side: "buy" } },
      ])
        .then((viableTrades) => {
          trade(viableTrades, newOrder);
        })
        .catch((err) => {
          throw err;
        });
    } else if (newOrder.side === "buy") {
      OrderModel.aggregate([
        { $match: { price: { $lte: newOrder.price }, side: "sell" } },
      ])
        .then((viableTrades) => {
          trade(viableTrades, newOrder);
        })
        .catch((err) => {
          throw err;
        });
    }
  }
};
