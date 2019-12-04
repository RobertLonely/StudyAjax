// 引入express框架
const express = require("express");
// 引入path模块
const path = require("path");
// 引入formidable模块
const formidable = require("formidable");

// 创建web服务器
const app = express();

// 开放静态资源目录
app.use(express.static(path.join(__dirname, "public")));

// 邮箱地址验证
app.get("/verifyEmailAdress", (req, res) => {
  // 接收客户端传递过来的邮箱地址
  const email = req.query.email;
  // 判断邮箱地址注册过的情况
  if (email == "robert@lee.com") {
    // 设置http状态码并对客户端做出响应
    res
      .status(400)
      .send({ message: "邮箱地址已经注册过了, 请更换其他邮箱地址" });
  } else {
    // 邮箱地址可用的情况
    // 对客户端做出响应
    res.send({ message: "恭喜, 邮箱地址可用" });
  }
});

// 输入框文字提示
app.get("/searchAutoPrompt", (req, res) => {
  // 搜索关键字
  const key = req.query.key;
  // 提示文字列表
  const list = [
    "罗伯特大帅比",
    "罗伯特人见人爱",
    "罗伯特不得不说的十优点",
    "罗伯特成长史",
    "漫威-钢铁侠",
    "漫威-蜘蛛侠",
    "漫威-美国队长",
    "漫威-黑寡妇",
    "漫威-奇异博士"
  ];
  // 搜索结果
  let result = list.filter(item => item.includes(key));
  // 将查询结果返回给客户端
  res.send(result);
});

// 获取省份
app.get("/province", (req, res) => {
  res.json([
    {
      id: "001",
      name: "黑龙江省"
    },
    {
      id: "002",
      name: "四川省"
    },
    {
      id: "003",
      name: "河北省"
    },
    {
      id: "004",
      name: "江苏省"
    }
  ]);
});

// 根据省份id获取城市
app.get("/cities", (req, res) => {
  // 获取省份id
  const id = req.query.id;
  // 城市信息
  const cities = {
    "001": [
      {
        id: "300",
        name: "哈尔滨市"
      },
      {
        id: "301",
        name: "齐齐哈尔市"
      },
      {
        id: "302",
        name: "牡丹江市"
      },
      {
        id: "303",
        name: "佳木斯市"
      }
    ],
    "002": [
      {
        id: "400",
        name: "成都市"
      },
      {
        id: "401",
        name: "绵阳市"
      },
      {
        id: "402",
        name: "德阳市"
      },
      {
        id: "403",
        name: "攀枝花市"
      }
    ],
    "003": [
      {
        id: "500",
        name: "石家庄市"
      },
      {
        id: "501",
        name: "唐山市"
      },
      {
        id: "502",
        name: "秦皇岛市"
      },
      {
        id: "503",
        name: "邯郸市"
      }
    ],
    "004": [
      {
        id: "600",
        name: "常州市"
      },
      {
        id: "601",
        name: "徐州市"
      },
      {
        id: "602",
        name: "南京市"
      },
      {
        id: "603",
        name: "淮安市"
      }
    ]
  };
  // 响应
  res.send(cities[id]);
});

// 根据城市id获取县城
app.get("/areas", (req, res) => {
  // 获取城市id
  const id = req.query.id;
  // 县城信息
  const areas = {
    "300": [
      {
        id: "20",
        name: "道里区"
      },
      {
        id: "21",
        name: "南岗区"
      },
      {
        id: "22",
        name: "平房区"
      },
      {
        id: "23",
        name: "松北区"
      }
    ],
    "301": [
      {
        id: "30",
        name: "龙沙区"
      },
      {
        id: "31",
        name: "铁锋区"
      },
      {
        id: "32",
        name: "富拉尔基区"
      }
    ]
  };
  // 响应
  res.send(areas[id] || []);
});

// 01对应路由处理函数
app.get("/artTemplate", (req, res) => {
  res.send("hello world");
});

// 05对应路由处理函数
app.post("/use", (req, res) => {
  // 创建表单解析对象
  const form = new formidable.IncomingForm();
  // 对表当进行解析
  form.parse(req, (err, fields, files) => {
    res.send(fields);
  });
});

// 06对应路由处理函数
app.post("/instance", (req, res) => {
  // 创建表单解析对象
  const form = new formidable.IncomingForm();
  // 对表当进行解析
  form.parse(req, (err, fields, files) => {
    res.send(fields);
  });
});

// 07对应路由处理函数
app.post("/binary", (req, res) => {
  // 创建表单解析对象
  const form = new formidable.IncomingForm();
  // 设置上传二进制文件的存储路径
  form.uploadDir = path.join(__dirname, "public", "uploads");
  // 设置上传二进制文件的默认后缀
  form.keepExtensions = true;
  // 对表当进行解析
  form.parse(req, (err, fields, files) => {
    res.send(files.file.path.split("public")[1]);
  });
});

// 监听端口
app.listen(3000);
console.log("服务器启动成功");
