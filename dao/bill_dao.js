const {Bill} = require('./model.js');

const BillDao = {
	save(billinfo){
		console.log(Bill);
		billinfo.billtime = new Date();
		return new Bill(billinfo).save();
	},
	find(condition){
		if(condition.act === 'load'){
			return Bill.find().limit(parseInt(condition.count)).skip((condition.page - 1)*condition.count);
		}else if(condition.act === 'pagination'){
			return Bill.countDocuments();
		}
	}
};


module.exports = BillDao;