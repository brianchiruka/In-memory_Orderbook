const OrderModel = require("../../database/models/order.model");

//TODO: use aggregation framework to include an orderCount. use $group, then add a counter for matched price, $project to add orderCount field

exports.fetchOrderbook = async (req, res) => {
  try {
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
};
