function ajax(options) {
  // 配置默认参数
  var def = {
    type: "get",
    url: "",
    data: {},
    success: function(data) {
      console.log(data);
    },
    error: function(data) {
      console.log(data);
    }
  };
  // 如果有传入值，覆盖默认值
  Object.assign(def, options);
  // 创建ajax对象
  var xhr = new XMLHttpRequest();
  // 将请求数据由对象类型转换成字符串类型
  var params = "";
  for (key in def.data) {
    params = params + key + "=" + def.data[key] + "&";
  }
  // 去除多余'&'符号
  params = params.substring(0, params.length - 1);
  // 配置ajax对象,送请求
  if (def.type === "get") {
    xhr.open(def.type, def.url + "?" + params);
    xhr.send();
  } else {
    xhr.open(def.type, def.url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }

  // 接收服务器端返回客户端的数据
  xhr.onload = function() {
    // 获取响应报文的响应类型
    var contentType = xhr.getResponseHeader("Content-Type");
    var responseText = xhr.responseText;
    // 判断响应类型
    if (contentType.includes("application/json")) {
      responseText = JSON.parse(xhr.responseText);
    }
    if (xhr.status === 200) {
      def.success(responseText);
    } else {
      def.error(responseText);
    }
  };
}

// ajax({
//   type: "get",
//   url: "http://localhost:3000/package",
//   data: {
//     name: "罗伯特",
//     age: 18
//   },
//   success: function(data) {
//     console.log(data);
//   },
//   error: function(data) {
//     console.log(data);
//   }
// });
