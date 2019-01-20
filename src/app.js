// 导包
const express = require('express')
const path = require('path')

// 创建app
const app = express()



// 设置静态资源更目录
app.use(express.static(path.join(__dirname,'public')))


// 导入account路由
const accountRouter = require(path.join(__dirname,'./routers/accountRouter'));
app.use('/account',accountRouter)


// 监听端口
app.listen(3000)