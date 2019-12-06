// 引入mongoose模块
const mongoose = require("mongoose");

// 连接数据库
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("数据库连接成功");
  });

// 创建任务集合规则
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);
// 创建todo集合
const Task = mongoose.model("task", taskSchema);
// mongoose.set("useFindAndModify", false);

// 创建文档
// Task.create({
//   title: "吃饭",
//   completed: false
// });

// 将集合构造函数作为模块成员进行导出
module.exports = Task;
