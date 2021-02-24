const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// error middlewares
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

// Routes
const userRouter = require("./routes/user");
const shoppingItemRouter = require("./routes/shoppingItem");

// Connect DB
connectDB();

// init app
const app = express();

// bodyparser
app.use(express.json());

// Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// cors
app.use(cors());

// Routes

app.use("/api/a1/users", cors(), userRouter);
app.use("/api/a1/shoppingItems", cors(), shoppingItemRouter);

// Middlewares
app.use(errorHandler);
// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server rennt auf Port ${PORT} 🏃`.blue.inverse);
});
