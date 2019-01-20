// 导包
const express = require('express')

// 创建app
const app = express()

// 处理请求
app.get('/',(req,res) => {
    res.send('111')
})

app.listen(3000)