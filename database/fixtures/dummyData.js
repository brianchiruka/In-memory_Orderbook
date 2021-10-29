//Dummy data to use for tests

exports.fakeOrderbookData = {
  Asks: [],
  Bids: [],
  LastChanged: Date.now(),
};

exports.fakeBuyOrderData = {
  side: "buy",
  quantity: 0.125,
  price: 920000,
  currencyPair: "BTCZAR",
};

exports.fakeSellOrderData = {
  side: "sell",
  quantity: 0.125,
  price: 920000,
  currencyPair: "BTCZAR",
};

exports.fakeOrderDataEmptyFields = {
  side: "",
  quantity: NaN,
  price: NaN,
  currencyPair: "",
};

exports.fakeIdFormatData = {
  correctFormat: "61784316aa2a14d7af9da686",
  incorrectFormat: "dummy",
};
