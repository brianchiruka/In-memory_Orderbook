const Order = require("../models/order.model");
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost/orderbook";

///AGGREGATE STUFF///////////////////////////

mongoose.connect(mongoDB, { useNewUrlParser: true }).catch((err) => {
  throw err;
});

Order.aggregate([
  {
    $group: {
      _id: "$price",
      result: { $push: "$$ROOT" },
      count: { $sum: 1 },
    },
  },
  { $match: { count: { $gte: 2 } } },
])
  .then((orders) => {
    orders.forEach((order) => {
      console.log(order);
    });
    mongoose.connection.close();
  })
  .catch((err) => {
    mongoose.connection.close();
    throw err;
  });

///////////////////////////////////////////////////
