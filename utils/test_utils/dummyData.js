exports.fakeBuyOrderData = {
  side: "buy",
  quantity: 0.125,
  price: 920000,
  currencyPair: "BTCZAR",
};

exports.fakeSavedOrder = {
  _id: "6190e760e89f4659c0d5ecb1",
  side: "buy",
  quantity: 0.125,
  price: 920000,
  currencyPair: "BTCZAR",
};

exports.fakeSavedOrderBuy1BTC = {
  _id: "6190e760e89f4659c0d5ecb1",
  side: "buy",
  quantity: 1,
  price: 920000,
  currencyPair: "BTCZAR",
};

exports.fakeSavedOrderBuy2BTC = {
  _id: "6190e760e89f4659c0d5ecb1",
  side: "buy",
  quantity: 2,
  price: 920000,
  currencyPair: "BTCZAR",
};

exports.fakeSideErrorOrder = {
  side: "ipsum",
  quantity: 0.125,
  price: 920000,
  currencyPair: "BTCZAR",
};

exports.fakeTrade = {
  takerSide: "sell",
  quantity: 0.125,
  price: 920000,
  currencyPair: "BTCZAR",
};

exports.fakeViableTrades = [
  {
    _id: "6190ed19819295f7f97b89d6",
    side: "sell",
    quantity: 0.5,
    price: 920000,
    currencyPair: "BTCZAR",
  },
  {
    _id: "6190ecf0819295f7f97b89cd",
    side: "sell",
    quantity: 0.5,
    price: 920000,
    currencyPair: "BTCZAR",
  },
  {
    _id: "6190ecf7819295f7f97b89d0",
    side: "sell",
    quantity: 0.1,
    price: 920000,
    currencyPair: "BTCZAR",
  },
];
