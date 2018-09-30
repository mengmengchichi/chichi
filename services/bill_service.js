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
	},
	//账单信息修改
	update(req,res,next){
		var{
			goodscode,
			goodsname,
			goodsunit,
			goodscount,
			totalprice,
			Supplier,
			payment,
		} = req.query;
		console.log(req.query);
		BillDao.update({
			goodscode,
			goodsname,
			goodsunit,
			goodscount,
			totalprice,
			Supplier,
			payment,
		}).then((data)=>{
			if(data.ok){
				BillDao.find({
					_id:goodscode,
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
		BillDao.remove({
			_id:id
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
	selectBill(req,res,next){
		const {
			goodsname,
			Supplier,
			payment,
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
		      {goodsname: {$regex: goodsname}},
		      {Supplier: {$regex: Supplier, $options: '$i'}}, //  $options: '$i' 忽略大小写
		      {payment: {$regex: payment, $options: '$i'}}
		    ]
		};
		BillDao.find(sel).then((data)=>{
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