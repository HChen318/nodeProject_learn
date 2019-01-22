//mongodb 代码
const MongoClient = require('mongodb').MongoClient;
//获取mongodb的id
var ObjectId = require('mongodb').ObjectId;


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ch';
/**
 * collectionName 集合名称
 * data 数据 
 * callback 回调 把结果告诉控制器
 * 
 */
// 查找一个函数方法
const findSingle = (collectionName, data, callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName)
        // 调用数据库
        collection.findOne(data, (err, result2) => {
            // 关闭数据库
            client.close();
            // 执行回调函数,实参 把结果传递调用给他的控制器
            callback(err, result2)
        })
    })
}

// 查找所有的函数方法
const findMany = (collectionName, data, callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName)
        // 调用数据库
        collection.find(data).toArray((err, docs) => {
            client.close();
            callback(err, docs)
        })
    })
}


// 插入一条的方法
/**
 * 
 * @param {*} collection 要操作的集合
 * @param {*} data 操作的数据
 * @param {*} callback 回调函数 用于传参给
 */
const insertSingle = (collectionName, data, callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection(collectionName);
        collection.insertOne(data, (err, result) => {
            // 关闭数据库
            client.close();
            // 执行回调函数把参数传递过去
            callback(err, result)
        });
    })
}


/**
 * 
 * @param {*} condition 修改的条件
 * @param {*} collectionName 要修改的集合
 * @param {*} data 修改的数据
 * @param {*} callback 回调函数传参
 */
const updateSingle = (condition,collectionName,data,callback) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection(collectionName);
        collection.updateOne(condition,{$set:data},(err,result) =>{
            // 关闭数据库
            client.close();
            callback(err, result)
        })
    })
}

/**
 * 
 * @param {*} collection 要操作的集合
 * @param {*} data 要删除的数据
 * @param {*} callback 回调给控制器传参
 */
const delStudent = (collectionName,data,callback) => {
    collection(collectionName,(collection,client) =>{
        collection.deleteOne(data,(err,result) =>{
           // 关闭数据库
           client.close();
            //回调函数给控制器传参
           callback(err, result)
        })
    })
}



// 封装集合那些方法
const collection = (collectionName,callback) =>{
    MongoClient.connect(url, {useNewUrlParser: true}, 
        function (err, client) {
        const db = client.db(dbName);
        // 拿到集合
        const collection = db.collection(collectionName);
        callback(collection,client)
    })
}






module.exports = {
    findSingle,
    findMany,
    insertSingle,
    ObjectId,
    updateSingle,
    delStudent
}