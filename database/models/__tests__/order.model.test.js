const Course = require("../course.model");
const User = require("../user.model");
const { fakeBuyOrderData } = require("../../fixtures");
const {
  validateNotEmpty,
  validateArrayLength,
  validateStringEquality,
  validateArrayContaining,
} = require("../../../utils/test-utils/validators.utils");
const {
  dbConnect,
  dbDisconnect,
} = require("../../../utils/test-utils/dbHandler.utils");

beforeAll(async () => dbConnect());
afterEach(async () => clearDatabase());
afterAll(async () => dbDisconnect());

describe("Order Model Test Suite", () => {
  test("should validate saving a new order successfully", async () => {
    const validOrder = new Order({
      Asks: fakeBuyOrderData,
    });
    const savedStudentUser = await validStudentUser.save();

    validateNotEmpty(savedStudentUser);
    validateStringEquality(savedStudentUser.role, fakeUserData.role);
    validateStringEquality(savedStudentUser.local.email, fakeUserData.email);
    validateStringEquality(
      savedStudentUser.local.username,
      fakeUserData.username
    );
    validateStringEquality(
      savedStudentUser.local.password,
      fakeUserData.password
    );
    validateStringEquality(
      savedStudentUser.local.firstName,
      fakeUserData.firstName
    );
    validateStringEquality(
      savedStudentUser.local.lastName,
      fakeUserData.lastName
    );
  });
});
