// 引入express框架
const express = require("express");
// 引入path模块
const path = require("path");
// 引入body-parser模块
const bodyParser = require("body-parser");
// 引入fs模块
const fs = require("fs");

// 创建web服务器
const app = express();

// 开放静态资源目录
app.use(express.static(path.join(__dirname, "./public")));

// 配置body-parser模块，拦截所有请求
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 01对应路由处理函数
app.get("/ajax", (req, res) => {
  res.send("ajax基础");
});

// 02对应路由处理函数
app.get("/json", (req, res) => {
  res.send({ name: "哈哈" });
});

//  03对应路由处理函数
app.post("/post", (req, res) => {
  res.send(req.body);
});

//  04对应路由处理函数
app.get("/get", (req, res) => {
  res.send(req.query);
});

//  05对应路由处理函数
app.post("/json", (req, res) => {
  console.log(req.body);

  res.send(req.body);
});

//  06对应路由处理函数
app.get("/ready", (req, res) => {
  res.send("ready");
});

// 07对应路由处理函数
app.get("/error", (req, res) => {
  res.status(400).send("no ok");
});

// 08对应路由处理函数
app.get("/cache", (req, res) => {
  fs.readFile("./public/test.txt", "utf8", (err, data) => {
    console.log(data);

    res.send(data);
  });
});

// 09对应路由处理函数
app.get("/async", (req, res) => {
  res.send("3");
});
// 监听web端口
app.listen(3000);
console.log("服务器启动成功");
