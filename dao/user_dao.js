const {User} = require('./model.js');

const UserDao = {
	//注册保存信息
	save(userinfo){
		userinfo.reg_time = new Date();
		return new User(userinfo).save();
	},
	//登录查询信息
	find(condition){
		return User.find(condition);	
	},
	
	
	load(condition){
		if(condition.act === 'load'){
			return User.find().limit(parseInt(condition.count)).skip((condition.page - 1)*condition.count);
		}else if(condition.act === 'pagination'){
			
			return User.countDocuments();
		}
	},
	//修改信息
	update(changeinfo){
		return User.updateOne({userpassword:changeinfo});
	}
}


module.exports = UserDao;