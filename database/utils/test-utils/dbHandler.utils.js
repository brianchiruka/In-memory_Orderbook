const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo = MongoMemoryServer;

/**
 * Connect to the in-memory database.
 */
module.exports.connectOrderbook = async () => {
  const mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on("error", (err) => {
    if (err.message.code === "ETIMEDOUT") {
      throw err;
      mongoose.connect(mongoUri, mongooseOpts);
    }
    throw err;
  });
  console.log(`Connected to orderbook on ${mongoUri}`);
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.disconnectOrderbook = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearOrderbook = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
