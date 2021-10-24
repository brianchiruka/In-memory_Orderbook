const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo = MongoMemoryServer;

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
};  

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
