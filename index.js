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
  console.log("sucessfully connect to mongodb")
);

// middleware
// body-parser 是 Express 經常使用的中介軟體，用於解析請求的資料(body)
// 流程：user => post data => node.js => Express => body-parse =>middlewaves,最後從middlewaves返回結果到node.js => user
// express.json()解析request中body部分的json內容，return Object
// header必須設置為‘content-type: application/json’
app.use(express.json());

// router middlewares, .use()第二個參數是callback function
app.use("/api/user", authRoute);

app.listen(port, (req, res) => console.log("local server start"));
