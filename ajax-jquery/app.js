// 引入express框架
const express = require("express");
// 引入path模块
const path = require("path");
// 引入body-parser
const bodyParser = require("body-parser");

// 创建web服务器
const app = express();

// 开放静态资源目录
app.use(express.static(path.join(__dirname, "public")));

// 解析所有请求体中的参数
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 01对应路由处理函数
app.get("/base", (req, res) => {
  res.send(req.query);
});

// 02对应路由处理函数
app.post("/params", (req, res) => {
  res.send(req.body);
});

// 03对应路由处理函数
app.get("/jsonp", (req, res) => {
  // res.jsonp(req.query);

  let fn = req.query.cb;
  res.send(fn + '("ok")');
});

// 05对应路由处理函数
app.use("/getAndPost", (req, res) => {
  if (req.method === "GET") {
    res.send("get请求：" + JSON.stringify(req.query));
  } else {
    res.send("post请求：" + JSON.stringify(req.body));
  }
});

// 06对应路由处理函数
app.get("/users", (req, res) => {
  res.send("获取用户列表");
});

app.get("/users/:id", (req, res) => {
  res.send("获取用户id为" + req.params.id + "的信息");
});

app.delete("/users/:id", (req, res) => {
  res.send("删除用户id为" + req.params.id + "的信息");
});

app.put("/users/:id", (req, res) => {
  res.send("更新用户id为" + req.params.id + "的信息");
});

app.post("/users/:id", (req, res) => {
  res.send("提交用户id为" + req.body.num + "的信息");
});

// 07对应路由处理函数
app.get("/xml", (req, res) => {
  res.setHeader("content-type", "text/xml");
  res.send(
    "<message><title id='title'>消息标题</title><content>消息内容</content></message>"
  );
});

// todo案例对应路由处理函数
const todo = require("./route/todo");
// 当客户端的请求路径以/todo开头时
app.use("/todo", todo);

// 监听web端口
app.listen(3000);
console.log("服务器启动成功");
