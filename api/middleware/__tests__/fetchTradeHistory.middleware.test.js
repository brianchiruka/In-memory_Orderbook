const { fetchTradeHistory } = require("../index");
const TradeHistoryModel = require("../../../database/models/tradehistory.model");
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

describe("fetchTradeHistory Middleware Test Suite", () => {
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

  test("should validate that fetchOrderMiddleware can fetch trade history even when empty", async () => {
    let emptyTradeHistory = [];
    await fetchTradeHistory(req, res);
    validateStringEquality(this.jsonContent, emptyTradeHistory);
  });

  test("should validate that middleware can fetch trade history with existing trade", async () => {
    const recentTrade = new TradeHistoryModel(fakeTrade);
    const savedTrade = await recentTrade.save();

    validateNotEmpty(savedTrade);

    await fetchTradeHistory(req, res);

    validateNotEmpty(this.jsonContent);
    validateStringEquality(this.jsonContent[0].takerSide, savedTrade.takerSide);
    validateStringEquality(
      this.jsonContent[0].currencyPair,
      savedTrade.currencyPair
    );
    validateStringEquality(this.jsonContent[0].price, savedTrade.price);
    validateStringEquality(this.jsonContent[0].quantity, savedTrade.quantity);
  });
});
