const orderbookModel = require("../models/orderbook");

/**
 * Stores new product into the database.
 * @params {Object} product object to create.
 * @throws {Error} if product is not provided.
 */

module.exports.create = async (order) => {
  if (!order) throw new Error("Missing order");

  await orderbookModel.create(order);
};
