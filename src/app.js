// 导包
const express = require('express')
const path = require('path')

// post第三方模块
var bodyParser = require('body-parser')

// 创建app
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// 设置静态资源更目录
app.use(express.static(path.join(__dirname,'public')))


// 导入account路由
const accountRouter = require(path.join(__dirname,'./routers/accountRouter'));
// 这句话给express注入了很多方法
app.use('/account',accountRouter)


// 监听端口
app.listen(3000)