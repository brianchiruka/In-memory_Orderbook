const { limitOrderHandler } = require("../index");
const {
  mockRequest,
  mockResponse,
} = require("../../../utils/test_utils/interceptors.utils");
const {
  fakeBuyOrderData,
  fakeSideErrorOrder,
} = require("../../../utils/test_utils/dummyData");
const {
  validateNotEmpty,
  validateStringEquality,
} = require("../../../utils/test_utils/validators.utils");
const {
  connectOrderbook,
  disconnectOrderbook,
  clearOrderbook,
} = require("../../../utils/global_utils/dbHandler.utils");

describe("limitOrder Middleware Test Suite", () => {
  beforeAll(async () => connectOrderbook());
  afterEach(async () => clearOrderbook());
  afterAll(async () => disconnectOrderbook());

  test("should validate rejecting a request with an error on the `side` field", async () => {
    let req = {};
    req.body = fakeSideErrorOrder;
    let res = {
      sendMessage: "",
      statusCode: "",
      send: (input) => {
        this.sendMessage = input;
      },
      status: (input) => {
        this.statusCode = input;
      },
    };

    await limitOrderHandler(req, res);

    validateNotEmpty(this.sendMessage);

    validateStringEquality(
      this.sendMessage,
      `You entered side: '${req.body.side}'. Please specify side as 'buy' or 'sell'.`
    );
  });

  test("should validate saving a new order succesfully", async () => {
    let req = mockRequest();
    let res = mockResponse();
    req.body = fakeBuyOrderData;

    const newOrder = await limitOrderHandler(req, res);

    validateNotEmpty(newOrder);
    validateStringEquality(newOrder.side, fakeBuyOrderData.side);
    validateStringEquality(newOrder.price, fakeBuyOrderData.price);
    validateStringEquality(newOrder.quantity, fakeBuyOrderData.quantity);
    validateStringEquality(
      newOrder.currencyPair,
      fakeBuyOrderData.currencyPair
    );
    expect(res.status).toBeCalledWith(201);
  });
});
