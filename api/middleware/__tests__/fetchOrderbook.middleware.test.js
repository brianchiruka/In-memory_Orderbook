const { fetchOrderbook } = require("../index");
const OrderModel = require("../../../database/models/order.model");
const { fakeBuyOrderData } = require("../../../utils/test_utils/dummyData");
const {
  validateNotEmpty,
  validateStringEquality,
} = require("../../../utils/test_utils/validators.utils");
const {
  connectOrderbook,
  disconnectOrderbook,
  clearOrderbook,
} = require("../../../utils/global_utils/dbHandler.utils");

describe("fetchOrderbook Middleware Test Suite", () => {
  beforeAll(async () => connectOrderbook());
  afterEach(async () => clearOrderbook());
  afterAll(async () => disconnectOrderbook());

  let req = {};
  let res = {
    jsonContent: "",
    json: (input) => {
      this.jsonContent = input;
    },
  };

  test("should validate that fetchOrderMiddleware can fetch orderbook even when empty", async () => {
    let emptyOrderbook = { Asks: [], Bids: [] };
    await fetchOrderbook(req, res);
    validateStringEquality(this.jsonContent, emptyOrderbook);
  });

  test("should validate that middleware can fetch orderbook with existing order", async () => {
    const validOrder = new OrderModel(fakeBuyOrderData);
    const savedOrder = await validOrder.save();

    validateNotEmpty(savedOrder);

    await fetchOrderbook(req, res);

    validateNotEmpty(this.jsonContent);
    validateStringEquality(this.jsonContent.Bids[0].side, savedOrder.side);
    validateStringEquality(
      this.jsonContent.Bids[0].currencyPair,
      savedOrder.currencyPair
    );
    validateStringEquality(this.jsonContent.Bids[0].price, savedOrder.price);
    validateStringEquality(
      this.jsonContent.Bids[0].quantity,
      savedOrder.quantity
    );
  });
});
