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
		}
	}
};


module.exports = SupplierDao;