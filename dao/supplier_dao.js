const {Supplier} = require('./model.js');

const SupplierDao = {
	save(Supplierinfo){
		Supplierinfo.suppliertime = new Date();
		return new Supplier(Supplierinfo).save();
	},
	find(condition){
		if(condition.act === 'load'){
			return Supplier.find().limit(parseInt(condition.count)).skip((condition.page - 1) * condition.count);
		}else if(condition.act === "pagination"){
			return Supplier.countDocuments();
		}else{
			return Supplier.find(condition);
		}
	},
	//修改供应商
	update(changeinfo){
		var date = new Date();
		return Supplier.update({suppliertime:changeinfo.suppliertime},{
			suppliercode:changeinfo.suppliercode,
			suppliername:changeinfo.suppliername,
			linkman:changeinfo.linkman,
			linkphone:changeinfo.linkphone,
			linkaddress:changeinfo.linkaddress,
			supplierfax:changeinfo.supplierfax,
			suppliertime:date
		});
	},
	//删除供应商
	remove(condition){
		return Supplier.remove(condition);
	}
};


module.exports = SupplierDao;