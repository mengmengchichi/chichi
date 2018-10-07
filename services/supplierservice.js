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
	},
	
	//账单信息修改
	update(req,res,next){
		var{
			suppliercode,
			suppliername,
			linkman,
			linkphone,
			linkaddress,
			supplierfax,
			suppliertime,
		} = req.query;
		console.log(req.query);
		supplierDao.update({
			suppliercode,
			suppliername,
			linkman,
			linkphone,
			linkaddress,
			supplierfax,
			suppliertime,
		}).then((data)=>{
			if(data.ok){
				supplierDao.find({
					suppliercode:suppliercode,
				}).then((data)=>{
					res.json({
						res_code:1,
						res_error:'',
						res_body:{data}
					});	
				}).catch((err)=>{
					res.json({
						res_code:0,
						res_error:err,
						res_body:{}
					});
				})	
			}								
		}).catch((err)=>{
			res.json({
				res_code:0,
				res_error:err,
				res_body:{}
			});
		});
	},
	
	//删除账单信息
	remove(req,res,next){
		const {id} = req.query;
		supplierDao.remove({
			suppliertime:id
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
	
	//查询账单信息
	selectSupplier(req,res,next){
		const {
			suppliername,
		} = req.query;
//		var sel = {
//			$and:[
//				{goodsname:{$regex:goodsname}},
//				{Supplier:{$regex:Supplier}}
//				]
//		};
		console.log(req.query);
		var sel = {
			$or:[ 
		      {suppliername: {$regex: suppliername}},
		    ]
		};
		supplierDao.find(sel).then((data)=>{
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
