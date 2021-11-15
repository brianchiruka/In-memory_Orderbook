const { saveOrder, tradeHandler } = require("../controllers/index");

exports.limitOrderHandler = async (req, res) => {
  const newOrder = await saveOrder(req, res);
  tradeHandler(newOrder);
  return newOrder;
};
