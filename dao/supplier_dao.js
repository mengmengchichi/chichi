const {Supplier} = require('./model.js');

const SupplierDao = {
	save(Supplierinfo){
		Supplierinfo.suppliertime = new Date();
		return new Supplier(Supplierinfo).save();
	}
}


module.exports = SupplierDao;