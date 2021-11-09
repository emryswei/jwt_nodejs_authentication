const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const express = require("express");
const app = express();

// import routers
const authRoute = require("./routes/auth");
dotenv.config();

// connect to the  mongodb
mongoose.connect(process.env.MONGODB_CONNECT, () =>
  console.log("connect to mongodb")
);

// middleware
app.use(express.json());

// router middlewares, 第二個參數是callback function
app.use("/api/user", authRoute);

app.listen(port, (req, res) => console.log("local server start"));
