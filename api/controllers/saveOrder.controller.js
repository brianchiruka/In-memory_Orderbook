const OrderModel = require("../../database/models/order.model");

exports.saveOrder = async (req, res) => {
  if (req.body.side === "sell" || req.body.side === "buy") {
    try {
      const newOrder = new OrderModel(req.body);
      await newOrder.save((err, doc) => {
        if (err) res.send(err);
      });
      res.status(201).json(`id: ${newOrder._id}`);
      console.log("Saved Order!");
      return newOrder;
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.send(
      `You entered side: '${req.body.side}'. Please specify side as 'buy' or 'sell'.`
    );
  }
};
