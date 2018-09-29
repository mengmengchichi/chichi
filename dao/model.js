const mongoose = require('mongoose');

//链接数据库
mongoose.connect('mongodb://localhost:27017/myproject');

//创建数据Schema

//用户Schema
const userSchema = new mongoose.Schema({
	usercode:String,
	username:{ type:String, unique: true },
	usersex:String,
	userborn:String,
	userphone:String,
	useraddress:String,
	userpassword:String,
	authority:String,
	reg_time:Date
});
//账单Schema
const billSchema = new mongoose.Schema({
	goodsname:String,
	goodsunit:String,
	goodscount:Number,
	totalprice:Number,
	Supplier:String,
	payment:String,
	billtime:Date
})
//供应商Schema
const supplierSchema = new mongoose.Schema({
	suppliercode:String,
	suppliername:String,
	linkman:String,
	linkphone:String,
	linkaddress:String,
	supplierfax:String,
	suppliertime:Date
})
//创建数据模型

//用户模型
const User = mongoose.model('user',userSchema);
//账单模型
const Bill = mongoose.model('bill',billSchema);
//供应商模型
const Supplier = mongoose.model('supplier',supplierSchema);
//导出模块
module.exports = {User,Bill,Supplier};
