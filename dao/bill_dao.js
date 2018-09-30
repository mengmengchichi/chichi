const {Bill} = require('./model.js');

const BillDao = {
	save(billinfo){
		billinfo.billtime = new Date();
		return new Bill(billinfo).save();
	},
	find(condition){
		console.log(condition);
		if(condition.act === 'load'){
			return Bill.find().limit(parseInt(condition.count)).skip((condition.page - 1)*condition.count);
		}else if(condition.act === 'pagination'){
			return Bill.countDocuments();
		}else{
			return Bill.find(condition);
		}
	},
	//修改账单
	update(changeinfo){
		return Bill.update({_id:changeinfo.goodscode},{
			goodsname:changeinfo.goodsname,
			goodsunit:changeinfo.goodsunit,
			goodscount:changeinfo.goodscount,
			totalprice:changeinfo.totalprice,
			Supplier:changeinfo.Supplier,
			payment:changeinfo.payment
		});
	},
	//删除账单
	remove(condition){
		return Bill.remove(condition);
	}
};


module.exports = BillDao;