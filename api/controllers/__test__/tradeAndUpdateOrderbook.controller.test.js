const { trade } = require("../index");
const {
  fakeViableTrades,
  fakeSavedOrderBuy1BTC,
  fakeSavedOrderBuy2BTC,
} = require("../../../utils/test_utils/dummyData");
const {
  validateNotEmpty,
  validateStringEquality,
} = require("../../../utils/test_utils/validators.utils");
const {
  connectOrderbook,
  clearOrderbook,
  disconnectOrderbook,
} = require("../../../utils/global_utils/dbHandler.utils");

describe("tradeAndUpdateOrderbook Controller Test Suite", () => {
  beforeAll(async () => connectOrderbook());
  afterEach(async () => clearOrderbook());
  afterAll(async () => disconnectOrderbook());

  test("should confirm a trade can fully liquidate a new trade", async () => {
    const tradedOrdersToDelete = await trade(
      fakeViableTrades,
      fakeSavedOrderBuy1BTC
    );

    validateNotEmpty(tradedOrdersToDelete);
    validateStringEquality(tradedOrdersToDelete[0], fakeViableTrades[0]._id);
    validateStringEquality(tradedOrdersToDelete[1], fakeViableTrades[1]._id);
    validateStringEquality(tradedOrdersToDelete[2], fakeSavedOrderBuy1BTC._id);
    expect(tradedOrdersToDelete).not.toEqual(
      expect.arrayContaining([fakeViableTrades[2]._id])
    );
  });

  test("should confirm a partially liquidated new trade", async () => {
    const tradedOrdersToDelete = await trade(
      fakeViableTrades,
      fakeSavedOrderBuy2BTC
    );

    validateNotEmpty(tradedOrdersToDelete);
    validateStringEquality(tradedOrdersToDelete[0], fakeViableTrades[0]._id);
    validateStringEquality(tradedOrdersToDelete[1], fakeViableTrades[1]._id);
    validateStringEquality(tradedOrdersToDelete[2], fakeViableTrades[2]._id);
    expect(tradedOrdersToDelete).not.toEqual(
      expect.arrayContaining([fakeSavedOrderBuy2BTC._id])
    );
  });
});
