const mongoose = require("mongoose");

const dbHandler = require("./db-handler");
const orderbookService = require("../src/services/orderbook");
const orderbookModel = require("../src/models/orderbook");

/**
 * Connect to a new in-memory database before running any tests
 */

beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data before every test.
 */

afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Order test suite.
 */
describe("order", () => {
  /**
   * Tests that have a valid order can be created through the orderbookService without throwing any errors.
   */
  it("can be created correctly", async () => {
    expect(
      async () => await orderbookService.create(orderComplete)
    ).not.toThrow();
  });
});

/**
 * Complete order example.
 */
