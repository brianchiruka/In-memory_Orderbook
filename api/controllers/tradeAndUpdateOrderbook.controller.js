const OrderModel = require("../../database/models/order.model");
const { saveTrade } = require("./saveTradeLog.controller");

exports.trade = async (viableTrades, newOrder) => {
  if (viableTrades.length > 0) {
    let tradedOrdersToDelete = [];
    let leftOverOrder = {};
    let orderQuantity = newOrder.quantity;
    let newOrderLiquidated = false;

    for (let i = 0; i < viableTrades.length; i++) {
      if (orderQuantity >= viableTrades[i].quantity) {
        orderQuantity = orderQuantity - viableTrades[i].quantity;
        tradedOrdersToDelete.push(viableTrades[i]._id);
      } else {
        //new order will be fully liquidated
        newOrderLiquidated = true;

        leftOverTradeOrder = {
          id: viableTrades[i]._id.toString(),
          quantity: viableTrades[i].quantity - orderQuantity,
        };

        await OrderModel.findOneAndUpdate(
          { _id: leftOverTradeOrder.id },
          {
            quantity: leftOverTradeOrder.quantity,
          }
        ).catch((err) => {
          throw err;
        });

        tradedOrdersToDelete.push(newOrder._id.toString());

        saveTrade(newOrder, newOrder.quantity);
        i = viableTrades.length;
        console.log("Order fully liquidated");
      }
    }

    if (!newOrderLiquidated) {
      await OrderModel.findOneAndUpdate(
        { _id: newOrder.id },
        {
          quantity: orderQuantity,
        }
      )
        .then(() => saveTrade(newOrder, orderQuantity))
        .catch((err) => {
          throw err;
        });
      console.log("Order traded but not fully liquidated");
    }

    // delete traded orders
    await OrderModel.deleteMany({
      _id: {
        $in: tradedOrdersToDelete,
      },
    }).catch((err) => {
      throw err;
    });

    return tradedOrdersToDelete;
  }
};
