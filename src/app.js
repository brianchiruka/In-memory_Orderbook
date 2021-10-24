require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.ORDERBOOK_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to orderbook"));

app.use(express.json());

const orderbookRouter = require("./routes/orderbook");
app.use("/orderbook", orderbookRouter);

app.listen(8000, () => console.log("Server Started"));
