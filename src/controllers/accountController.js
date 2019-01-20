/**
 * 导出一个方法,该方法获取注册页面
 */
const path = require('path');
// 导入mongodb
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ch';



// 返回注册页面
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/account.html'));
}


// 导出注册方法
exports.register = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功'
    }
    // 获取用户名结构赋值
    const {
        username
    } = req.body
    console.log(username)
 
    MongoClient.connect(url, {useNewUrlParser:true},function (err, client) {     
        // 拿到db
        const db = client.db(dbName);
        // 获取集合accountInfo
        const collection = db.collection('accountInfo');
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