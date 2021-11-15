const TradeHistoryModel = require("../../database/models/tradehistory.model");

exports.saveTrade = async (newOrder, orderQuantity) => {
  const recentTradeLog = {
    takerSide: newOrder.side,
    price: newOrder.price,
    quantity: orderQuantity,
    currencyPair: newOrder.currencyPair,
  };

  try {
    const newTrade = new TradeHistoryModel(recentTradeLog);

    await newTrade.save((err) => {
      if (err) throw err;
    });

    return newTrade;
  } catch (err) {
    throw err;
  }
};
