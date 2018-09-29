const BillDao = require('../dao/bill_dao.js');

const Billservice = {
	insert(req,res,next){
		//获取添加订单信息
		const{
			goodsname,
			goodsunit,
			goodscount,
			totalprice,
			Supplier,
			payment,
		} = req.query;
		//存入数据库
		BillDao.save({
			goodsname,
			goodsunit,
			goodscount,
			totalprice,
			Supplier,
			payment,
		}).then((data)=>{
			console.log(data);
			res.json({
				res_code:1,
				res_error:"",
				res_body:{
					data
				}
			});
		}).catch((err)=>{
			res.json({
				res_code:0,
				res_error:err,
				res_body:{
					
				}
			});
		});
	},
	find(req,res,next){
		const {act,page,count} = req.query;
		BillDao.find({act:act,page:page,count:count}).then((data)=>{
			res.json({
				res_code:1,
				res_error:'',
				res_body:{
					data
				}
			});
		}).catch((err)=>{
			res.json({
				res_code:0,
				res_error:err,
				res_body:{}
			});
		});
	}
}





//导出模块
module.exports = Billservice;