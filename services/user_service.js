const UserDao = require('../dao/user_dao.js');

const UserService = {
	
	//添加用户处理
	insert(req,res,next){
		const{
			usercode,
			username,
			usersex,
			userborn,
			userphone,
			useraddress,
			userpassword,
			authority,
		} = req.body;
		UserDao.save({
			usercode,
			username,
			usersex,
			userborn,
			userphone,
			useraddress,
			userpassword,
			authority,
		}).then((data)=>{
			res.json({
				res_code:1,
				res_error:"",
				res_body:{
					data:{
						usercode:data.usercode,
						username:data.username,
						usersex:data.usersex,
						userborn:data.userborn,
						userphone:data.userphone,
						authority:data.authority,
					}					
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
	//用户登录处理
	login(req,res,next){
		const{
			username,
			userpassword,
		} = req.body;
		
		UserDao.find({username,userpassword}).then((data)=>{			
			if(data.length !== 0){	
				data = data[0];
				res.json({
					res_code:1,
					res_error:'',
					res_body:{
						data:{
							usercode:data.usercode,
							username:data.username,
							usersex:data.usersex,
							userborn:data.userborn,
							userphone:data.userphone,
							authority:data.authority,
						}						
					}
				});
			}else{
				res.json({
					res_code:0,
					res_error:'',
					res_body:{}
				});
			}
		}).catch((err)=>{
			res.json({
				res_code:0,
				res_error:err,
				res_body:{}
			});
		});
	},
	//用户信息修改
	revise(req,res,next){
		const {passwordOK} = req.body;
		UserDao.update(passwordOK).then((data)=>{
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
		});
	}
	
	
	
}



//导出对象
module.exports = UserService;