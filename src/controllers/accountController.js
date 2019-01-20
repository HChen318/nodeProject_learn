/**
 * 导出一个方法,该方法获取注册页面
 */
const path = require('path')

exports.getRegisterPage = (req,res) => {
    res.sendFile(path.join(__dirname,'../public/views/account.html'));
}