const express = require('express')
const path = require('path')

// 创建路由对象
const studentManagerRouter = express.Router()


// 导入控制器
const studentManagerController = require(path.join(__dirname,"../controllers/studentManagerController.js"));
// 获取学生列表页面
studentManagerRouter.get('/list',studentManagerController.getStudentPage)


//获取新增列表页面
studentManagerRouter.get('/add',studentManagerController.getStudentAddPage);

//新增学生
studentManagerRouter.post('/add',studentManagerController.addStudent);


// 获取学生修改页面  动态路径参数 以冒号开头
studentManagerRouter.get('/edit/:studentId',studentManagerController.getAddEditPage)

// 修改学生信息
studentManagerRouter.post('/edit/:studentId',studentManagerController.editStudent)
// 测试
// studentManagerRouter.post('/edit',studentManagerController.editStudent)



// 导入路由对象
module.exports = studentManagerRouter;