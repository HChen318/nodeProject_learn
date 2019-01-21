const path = require('path');
var template = require('art-template');


const MongoClient = require('mongodb').MongoClient;


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ch';





exports.getStudentPage = (req, res) => {
    // 获取url参数的值
    console.log(req.query);
    // 所有字符串都包括空字符串
    const username = req.query.username || '';
    // Use connect method to connect to the server
    MongoClient.connect(url, {}, function (err, client) {

        const db = client.db(dbName);
        const collection = db.collection('studentInfo')
        collection.find({name:{$regex:username}}).toArray((err, docs) => {
            // console.log(docs);
            client.close();
            // 渲染页面
            // 存username这个值 
            var html = template(path.join(__dirname, '../public/views/list.html'), {student:docs,username});
            console.log(html);
            
            res.send(html)
            
        })


      
    });




}