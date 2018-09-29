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
	//修改信息
	update(changeinfo){
		return User.updateOne({userpassword:changeinfo});
	}
}


module.exports = UserDao;