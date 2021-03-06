// 引入express模块
const express = require("express");
// 引入path模块
const path = require("path");
// 引入bodyParser模块
const bodyParser = require("body-parser");
// 引入formidable模块
const formidable = require("formidable");
// 引入express-session模块
const session = require("express-session");

// 创建web服务器
const app = express();
// 开放静态资源目录
app.use(express.static(path.join(__dirname, "public")));
// 解析body部分
app.use(bodyParser.urlencoded({ extended: false }));
// 实现session功能
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

// 拦截所有请求
app.use((req, res, next) => {
  // 1.允许哪些客户端访问我。
  // 注意：如果跨域请求中涉及到cookie信息传递，值不可以为 * 号比如是具体的域名信息
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // 2.允许客户端使用哪些请求方法访问我
  res.header("Access-Control-Allow-Method", "post,get");
  // 3.允许客户端发送请求时携带cookie
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// 01，02对应路由处理函数
app.get("/test", (req, res) => {
  res.send('fn("ok")');
});

// 03对应路由处理函数
app.get("/optimize", (req, res) => {
  // 获取get请求参数
  // let fnName = req.query.callback;
  // res.send(fnName + '("优化的好啊")');

  // 相当于完成了上面的操作
  res.jsonp("优化的好啊");
});

// 04对应路由处理函数
app.get("/pack", (req, res) => {
  // 获取get请求参数
  let fnName = req.query.callback;
  res.send(fnName + "(" + JSON.stringify(req.query) + ")");
});

// 06对应路由处理函数
app.use("/cors", (req, res) => {
  if (req.method === "GET") {
    res.send(req.query);
  } else {
    res.send(req.body);
  }
});

// 07对应路由处理函数
app.get("/server", (req, res) => {
  res.send("ok");
});

// 08对应路由处理函数
app.post("/login", (req, res) => {
  // 创建表单解析对象
  var form = formidable.IncomingForm();
  // 解析表单
  form.parse(req, (err, fields, file) => {
    // 接收客户端传递过来的用户名和密码
    const { username, password } = fields;
    // 用户名密码比对
    if (username == "robert" && password == "123456") {
      // 设置session
      req.session.isLogin = true;
      res.send({ message: "登录成功" });
    } else {
      res.send({ message: "登录失败, 用户名或密码错误" });
    }
  });
});

app.get("/checkLogin", (req, res) => {
  // 判断用户是否处于登录状态
  if (req.session.isLogin) {
    res.send({ message: "处于登录状态" });
  } else {
    res.send({ message: "处于未登录状态" });
  }
});

// 监听web端口
app.listen(8000);
console.log("服务器2启动成功");
