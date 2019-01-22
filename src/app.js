// 导包
const express = require('express')
const path = require('path')

// 引入node session模块
var session = require('express-session');


// post第三方模块
var bodyParser = require('body-parser')

// 创建app
const app = express()

// parse application/x-www-form-urlencoded post
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())





// 设置静态资源更目录
app.use(express.static(path.join(__dirname,'public')))

// Use the session middleware 
app.use(session({ secret: 'keyboard cat',resave:false,saveUninitialized:false, cookie: { maxAge: 6000000 }}))


app.all('/*',(req,res,next) =>{
    // 拦截到所有请求
    // console.log(next);
    // console.log(req.url);
    if(req.url.includes('account')){
        // next 是允许下一个中间件运行
        next()
    }else{
         console.log(req.url);
        console.log('11112222');
        
        console.log(req.session.loginName);
        // 判断有没有session username里面有没有值
        if(req.session.loginName){
            next()
        }else{
            res.send(`<script>alert('请登录账号');location='/account/login'</script>`)
        }
    }
})


// 导入注册登录路由模块
const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'));
// 这句话给express注入了很多方法
// 分流
/**
 * 参数1：一级路径
 * 参数2：处理该路径的路由
 */
app.use('/account',accountRouter)


// 导入学生管理路由模块
const studentManagerRouter = require(path.join(__dirname,'./routers/studentManagerRouter.js'));

app.use("/studentmanager",studentManagerRouter)

// 监听端口
app.listen(3000);