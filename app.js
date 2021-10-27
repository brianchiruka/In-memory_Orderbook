require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const orderbookRouter = require("./api/routes/orderbook.routes");

/**
 * Connect to the in-memory database. CONFIRM CONFIRM CONFIRM CONFIRM
 */

// const { MongoMemoryServer } = require("mongodb-memory-server");
// let mongo = MongoMemoryServer;

// module.exports.connect = async () => {
//   mongo = await MongoMemoryServer.create();
//   const uri = mongo.getUri();

//   const mongooseOpts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   await mongoose.connect(uri, mongooseOpts);
// };

mongoose.connect(process.env.ORDERBOOK_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to orderbook"));

app.use(express.json());

app.use("/orderbook", orderbookRouter);

app.listen(8000, () => console.log("Server Started"));
