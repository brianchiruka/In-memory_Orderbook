const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const Order = require("../../database/models/order.model");
const {
  dbConnect,
  dbDisconnect,
} = require("../../database/utils/test-utils/dbHandler.utils");

//Getting the whole orderbook
router.get("/", async (req, res) => {
  async () => dbConnect();
  try {
    //fetch data once into a temp constant, then find from it to sort before responding
    const orderbook = {
      Asks: await Order.find({ side: "sell" })
        // .select("-_id -__v")
        .sort("price"),
      Bids: await Order.find({ side: "buy" })
        // .select("-_id -__v")
        .sort("-price"),
    };

    res.json(orderbook);
    async () => dbDisconnect();
  } catch {
    (err) => {
      async () => dbDisconnect();
      res.status(500).json({ message: err.message });
    };
  }
});
//Placing a limit order
router.post("/limitorder", async (req, res) => {
  ////////////////////////////////////////////////////////down
  // Order.aggregate([
  //   {
  //     $project: {
  //       id: "$_id",
  //       priceMatch: { $eq: ["$price", req.body.price] },
  //       orderCount: "$orderCount",
  //       quantity: "$quantity",
  //     },
  //   },
  // ])
  //   .then((orders) => {
  //     orders.forEach((order) => {
  //       // console.log(order);
  //       const orderMatchedByPrice = order._id;
  //       const orderMatchedByPriceI = order.id;
  //       const updatedOrderCount = order.orderCount + 1;
  //       console.log(orderMatchedByPrice);
  //       console.log(orderMatchedByPriceI);
  //       Order.findOneAndUpdate(
  //         orderMatchedByPrice,
  //         { orderCount: updatedOrderCount },
  //         // [(upsert = true)],
  //         console.log("done!!!!!!")
  //       );
  //     });
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });

  ////////////////////////////////////////////////////////up
  async () => dbConnect();
  try {
    const newOrder = new Order(req.body);

    await newOrder.save((err, doc) => {
      if (err) res.send(err);
    });

    res.status(201).json(`id: ${newOrder._id}`);
    async () => dbDisconnect();
  } catch (err) {
    res.status(400).json({ message: err.message });
    async () => dbDisconnect();
  }
});

router.get("/tradehistory", (req, res) => {
  async () => dbConnect();
  const changeStream = Order.watch().on("change", (change) =>
    console.log(change)
  );
  res.send(req.params.id);
  async () => dbDisconnect();
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
