/**
 * 注册和登录的处理
 */

// 导入express模块 ,path 模块
 const express = require('express');
 const path = require('path')
// 创建路由对象
 const accountRouter = express.Router();
 
//  导入控制器路由模块
const accountControler = require(path.join(__dirname,'../controllers/accountController'))

// 获取注册页面的请求
accountRouter.get('/register',accountControler.getRegisterPage)

// 导出路由对象
module.exports = accountRouter;
