const path = require('path');
var template = require('art-template');


// const MongoClient = require('mongodb').MongoClient;


// // Connection URL
// const url = 'mongodb://localhost:27017';
// // Database Name
// const dbName = 'ch';

//导入自定义模块
const databasetool = require(path.join(__dirname, '../tools/databasetool'));


// 获取学生页面
exports.getStudentPage = (req, res) => {
    // 获取url参数的值
    // console.log(req.query);
    // 所有字符串都包括空字符串 --------
    const username = req.query.username || '';
    // Use connect method to connect to the server

    databasetool.findMany('studentInfo', {
        name: {
            $regex: username
        }
    }, (err, docs) => {
        var html = template(path.join(__dirname, '../public/views/list.html'), {
            student: docs,
            username
        });
        // console.log(html);
        res.send(html)
    })

    // 封装前
    // MongoClient.connect(url, {}, function (err, client) {
    //     const db = client.db(dbName);
    //     const collection = db.collection('studentInfo')
    //     collection.find({
    //         name: {
    //             $regex: username
    //         }
    //     }).toArray((err, docs) => {
    //         // console.log(docs);
    //         client.close();
    //         // 渲染页面
    //         // 存username这个值 
    //         var html = template(path.join(__dirname, '../public/views/list.html'), {
    //             student: docs,
    //             username
    //         });
    //         console.log(html);

    //         res.send(html)

    //     })
    // });

};


// 获取学生新增页面
exports.getStudentAddPage = (req, res) => {
    const html = template(path.join(__dirname, "../public/views/add.html"), {})
    // console.log(html)
    res.send(html)
}





// 新增学生
exports.addStudent = (req, res) => {
    // console.log(req.body);
    databasetool.insertSingle('studentInfo', req.body, (err, result) => {
        // console.log(result);
        if (!result) { //失败
            res.send(`<script>alert("插入失败!")</script>`)
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })
}

// 编辑学生页面
exports.getAddEditPage = (req,res) =>{  
    // console.log(req.params);
    //获取mongodb的id
    const _id = databasetool.ObjectId(req.params.studentId);
    // console.log(_id);
    
    databasetool.findSingle('studentInfo',{_id},(err,doc) =>{
        // console.log(doc); //没查到数据为null
        // 使用服务端模板渲染
        const html = template(path.join(__dirname,'../public/views/edit.html'),doc);
        res.send(html)
    }) 
}

// 修改学生信息
exports.editStudent = (req,res) =>{
    // console.log(req.body);
    console.log(req.params.studentId);
    
    const _id = databasetool.ObjectId(req.params.studentId);
    // console.log(req.query._id);
    // const _id = req.query._id
    console.log(_id);
    
    databasetool.updateSingle({_id},'studentInfo',req.body,(err,result) =>{
        // console.log(result);       
        if (!result) { //失败
            res.send(`<script>alert("修改失败!")</script>`)
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })
    
};

// 删除学生信息 
exports.delStudent = (req,res) =>{
    // 获取id
    const _id = databasetool.ObjectId(req.params.studentId);
    // 调用方法
    databasetool.delStudent('studentInfo',{_id},(err,result) =>{
        console.log(result);   
        if (!result) { //失败
            res.send(`<script>alert("删除失败!")</script>`)
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    }) 

}

// 退出学生系统
exports.loginout = (req,res) => {
    req.session.loginName = null;
    res.send(`<script>location = '/account/login'</script>`)
}