const OrderModel = require("../order.model");
const { fakeBuyOrderData } = require("../../../utils/test_utils/dummyData");
const {
  validateNotEmpty,
  validateStringEquality,
  validateEquality,
} = require("../../../utils/test_utils/validators.utils");
const {
  connectOrderbook,
  disconnectOrderbook,
  clearOrderbook,
} = require("../../../utils/global_utils/dbHandler.utils");

beforeAll(async () => connectOrderbook());
afterEach(async () => clearOrderbook());
afterAll(async () => disconnectOrderbook());

describe("Order Model Test Suite", () => {
  test("should validate saving a new order successfully", async () => {
    const validOrder = new OrderModel(fakeBuyOrderData);
    const savedOrder = await validOrder.save();

    validateNotEmpty(savedOrder);

    validateStringEquality(savedOrder.side, fakeBuyOrderData.side);

    validateEquality(savedOrder.currencyPair, fakeBuyOrderData.currencyPair);

    validateEquality(savedOrder.price, fakeBuyOrderData.price);

    validateEquality(savedOrder.quantity, fakeBuyOrderData.quantity);
  });
});
