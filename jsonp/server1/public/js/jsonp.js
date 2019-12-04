function jsonp(options) {
  // 创建script标签
  var script = document.createElement("script");
  // 通过地址栏参数传递客户端需要的函数名称
  var params = "";

  for (key in options.data) {
    params = params + "&" + key + "=" + options.data[key];
  }

  // 设置随机函数名
  var fnName =
    "fn" +
    Math.random()
      .toString()
      .replace(".", "");
  // 往全局中定义要调用的方法
  window[fnName] = options.success;

  // 给src属性赋值
  script.src = options.url + "?callback=" + fnName + params;
  // 将script标签添加到页面中
  document.body.appendChild(script);
  // 当script标签加载完，移除它
  script.onload = function() {
    document.body.removeChild(script);
  };
}

// jsonp({
//   url: "http://localhost:8000/pack",
//   data: { username: "罗伯特", age: 18 },
//   success: function(data) {
//     console.log(data);
//   }
// });
