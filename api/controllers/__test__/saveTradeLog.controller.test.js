const { saveTrade } = require("../index");
const { fakeSavedOrder } = require("../../../utils/test_utils/dummyData");
const {
  validateNotEmpty,
  validateStringEquality,
} = require("../../../utils/test_utils/validators.utils");
const {
  connectOrderbook,
  clearOrderbook,
  disconnectOrderbook,
} = require("../../../utils/global_utils/dbHandler.utils");

describe("saveTradeLog Controller Test Suite", () => {
  beforeAll(async () => connectOrderbook());
  afterEach(async () => clearOrderbook());
  afterAll(async () => disconnectOrderbook());

  test("should validate saving a new trade successfully", async () => {
    let orderQuantity = 0.125;

    const newTrade = await saveTrade(fakeSavedOrder, orderQuantity);

    validateNotEmpty(newTrade);

    validateStringEquality(newTrade.takerSide, fakeSavedOrder.side);
    validateStringEquality(newTrade.quantity, fakeSavedOrder.quantity);
    validateStringEquality(newTrade.price, fakeSavedOrder.price);
    validateStringEquality(newTrade.currencyPair, fakeSavedOrder.currencyPair);
  });
});
