const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/mongo");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const userRoute = require("./routes/userRoutes");

dotenv.config();

const app = express();

//connect to DB
dbConnect();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully ");
});

//routes

app.use("/users", userRoute);

//for Error
app.use(notFound);
app.use(errorHandler);

module.exports = app;
