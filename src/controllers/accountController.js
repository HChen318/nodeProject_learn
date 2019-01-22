/**
 * 导出一个方法,该方法获取注册页面
 */
const path = require('path');

// 导入第三方包 captchapng  生成验证码图片
var captchapng = require('captchapng')





// 导入自定义模块 封装的包
const databasetool = require(path.join(__dirname, '../tools/databasetool.js'))



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
    console.log(username);

    // 判断用户名是否为空
    if (username == '') {
        result.status = 3;
        result.message = '用户名不能为空';
        res.json(result)
        return;
    };
    console.log(username);

    // 先查询后判断
    databasetool.findSingle('accountInfo', {
        username
    }, (err, doc) => {
        // 如果doc为 == null 没查询到,可以插入 如果查询到了 说明用户名已经存在
        console.log(doc);
        if (doc) {
            result.status = 1;
            result.message = '用户名已注册'
            res.json(result)
        } else {
            databasetool.insertSingle('accountInfo', req.body, (err, result2) => {
                // 如果result2等于null 就是插入失败
                if (!result2) {
                    result.status = 2;
                    result.message = '注册失败'
                }
                // 成功返回数据
                res.json(result)
            })
        }
    })

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
    var imgbase64 = Buffer.from(img, 'base64');
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

    databasetool.findSingle('accountInfo', {
        username,
        password
    }, (err, doc) => {
        if (!doc) {
            result.status = 2;
            result.message = '用户名或密码错误';
        } else {
            // 登录成功后把session储存起来
            req.session.loginName = username
        }


        // console.log(doc);

        res.json(result)

    })
}