const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const orderbookRouter = require("./api/routes/orderbook.routes");

// Connecting to the in-memory database.

const connectToMongoDb = async () => {
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

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
};

connectToMongoDb();

// Configuring routes and server.

app.use(express.json());

app.use("/orderbook", orderbookRouter);

app.listen(8000, () => console.log("Server Started"));
