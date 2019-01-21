/**
 * 导出一个方法,该方法获取注册页面
 */
const path = require('path');

// 导入第三方包 captchapng  生成验证码图片
var captchapng = require('captchapng')


// 导入mongodb
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ch';






// 返回注册页面
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/register.html'));
}


// 导出注册方法
exports.register = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功'
    }
    // 获取用户名结构赋值
    const {
        username,
        password
    } = req.body
    console.log(req.body);

    // 判断用户名是否为空
    if (username == '') {
        result.status = 3;
        result.message = '用户名不能为空';
        res.json(result)
        return;
    };


    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        // 拿到db
        let db = client.db(dbName);
        // 获取集合accountInfo
        let collection = db.collection('accountInfo');
        // 查询数据库的文档
        collection.findOne({
            username
        }, (err, doc) => {
            // 如果doc为 == null 没查询到,可以插入
            if (doc) {
                result.status = 1;
                result.message = '用户名已注册'
                // 关闭数据库
                client.close();
                res.json(result)
            } else {
                // 如果用户不存在
                collection.insertOne(
                    req.body, (err, result2) => {
                        // 如果result2等于null 就是插入失败
                        if (!result2) {
                            result.status = 2;
                            result.message = '注册失败'
                        }
                        // 成功返回数据
                        res.json(result)

                    }
                )
            }
        })
    });
}


// 获取登录页面
exports.loginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login.html'));
    // console.log(req.session);

}


// 获取验证码图片
exports.vcode = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000)

    // console.log(req.session);
    // 将产生的验证码 存在req.session 里面
    req.session.vcode = vcode;

    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });

    res.end(imgbase64);
}

// 获取登陆验证
exports.login = (req, res) => {
    const result = {
        status: 0,
        message: '登陆成功'
    };
    // 结构赋值数据
    const {
        username,
        password,
        code
    } = req.body;
    // 先判断验证码
    if (req.session.vcode != code) {
        result.status = 1,
            result.message = '验证码不正确'
        res.json(result);
        // 后面的代码不执行
        return;
    }
    // console.log(req.body);
    // 去数据库查询操作  异步请求
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        // 拿到db
        const db = client.db(dbName);
        // 获取集合accountInfo
        const collection = db.collection('accountInfo');
        console.log(username, password);

        //collection.find({username,password}   
        // ).toArray((err, docs) => {
        //         // 如果查询有数据库可以登陆
        //         console.log(docs);
        //     }) 

        //查找用户名
        collection.findOne({
            username,
            password
        }, (err, doc) => {
            if (!doc) {
                result.status = 2,
                    result.message = '用户名或密码错误'
            }
            client.close();
            res.json(result);
        })




    });


}