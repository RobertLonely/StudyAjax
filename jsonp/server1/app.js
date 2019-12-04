// 引入express模块
const express = require("express");
// 引入path模块
const path = require("path");
// 引入request模块
const request = require("request");
// 创建web服务器
const app = express();

// 07对应路由处理函数
app.get("/server", (req, res) => {
  request("http://localhost:8000/server", function(error, response, body) {
    res.send(body);
  });
});

// 开放静态资源目录
app.use(express.static(path.join(__dirname, "public")));
// 监听web端口
app.listen(3000);
console.log("服务器1启动成功");
