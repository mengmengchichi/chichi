const supplierDao = require('../dao/supplier_dao.js');

const SupplierService = {
	insert(req,res,next){
		//获取供应商信息
		const{
			suppliercode,
			suppliername,
			linkman,
			linkphone,
			linkaddress,
			supplierfax,
		} = req.query;
		//存入数据库
		supplierDao.save({
			suppliercode,
			suppliername,
			linkman,
			linkphone,
			linkaddress,
			supplierfax,
		}).then((data)=>{
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
	},
	//查询加载页面
	find(req,res,next){
		const {act,page,count} = req.query;
		supplierDao.find({
			act:act,
			page:page,
			count:count,
		}).then((data)=>{
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














module.exports = SupplierService;
