const express = require('express')
const path = require('path')

// 创建路由对象
const studentManagerRouter = express.Router()


// 导入控制器
const studentManagerController = require(path.join(__dirname,"../controllers/studentManagerController.js"));

studentManagerRouter.get('/list',studentManagerController.getStudentPage)


// 导入路由对象
module.exports = studentManagerRouter;