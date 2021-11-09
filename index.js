const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const express = require("express");
const app = express();

dotenv.config();

// connect to the  mongodb
mongoose.connect(process.env.MONGODB_CONNECT, () =>
  console.log("connect to mongodb")
);

// import routers
const authRoute = require("./routes/auth");

// router middlewares, 第二個參數是callback function
app.use("/api/user", authRoute);

app.listen(port, (req, res) => console.log("local server start"));
