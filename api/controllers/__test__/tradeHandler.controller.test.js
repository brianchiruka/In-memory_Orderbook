const { tradeHandler } = require("../index");
const { fakeSavedOrder } = require("../../../utils/test_utils/dummyData");

const {
  connectOrderbook,
  clearOrderbook,
  disconnectOrderbook,
} = require("../../../utils/global_utils/dbHandler.utils");

describe("tradeHandler Controller Test Suite", () => {
  beforeAll(async () => connectOrderbook());
  afterEach(async () => clearOrderbook());
  afterAll(async () => disconnectOrderbook());

  test("should confirm tradeHandler returns liquidated trades", async () => {
    await tradeHandler(fakeSavedOrder);
    //Todo: return a tradedOrdersToDelete from tradeHandler and test it below
  });
});
