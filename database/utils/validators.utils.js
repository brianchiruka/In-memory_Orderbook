exports.validateNotEmpty = (received) => {
  expect(received).not.toBeNull();
  expect(received).not.toBeUndefined();
  expect(received).toBeTruthy();
};

exports.validateEquality = (received, expected) => {
  expect(received).not.toBe("dummydummy");
  expect(received).toBe(expected);
};

exports.validateStringEquality = (received, expected) => {
  expect(received).not.toEqual("dummydfasfsdfsdfasdsd");
  expect(received).toEqual(expected);
};
