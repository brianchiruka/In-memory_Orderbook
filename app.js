const express = require("express");
const app = express();
const orderbookRouter = require("./api/routes/orderbook.route");
const tradehistoryRouter = require("./api/routes/tradehistory.route");
const limitorderRouter = require("./api/routes/limitorder.route");
const { connectOrderbook } = require("./utils/global_utils/dbHandler.utils");

// Configuring routes and server.
connectOrderbook();
app.use(express.json());

app.use("/orderbook", orderbookRouter);
app.use("/", tradehistoryRouter);
app.use("/orders", limitorderRouter);

app.listen(8000, () => console.log("Server Started"));
