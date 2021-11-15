const TradehistoryModel = require("../tradehistory.model");
const { fakeTrade } = require("../../../utils/test_utils/dummyData");
const {
  validateNotEmpty,
  validateStringEquality,
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
    const validTrade = new TradehistoryModel(fakeTrade);
    const savedTrade = await validTrade.save();

    validateNotEmpty(savedTrade);

    validateStringEquality(savedTrade.takerSide, fakeTrade.takerSide);

    validateStringEquality(savedTrade.currencyPair, fakeTrade.currencyPair);

    validateStringEquality(savedTrade.price, fakeTrade.price);

    validateStringEquality(savedTrade.quantity, fakeTrade.quantity);
  });
});
