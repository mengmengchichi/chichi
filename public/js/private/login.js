//登录处理

function Login(){
	this.addListener();
}

$.extend(Login.prototype,{
	//注册事件监听
	addListener(){
		$('.reset').on('click',this.resetHandler);
		$('.login').on('click',this.loginHandler);
	},
	//清除表单信息
	resetHandler(){
		$('.loginpart').find('input').val('');
		return false;
	},
	//提交表单信息
	loginHandler(){
		const url = "/api/user/login",
		data = $('.loginpart').serialize();
		$.post(url,data,(data)=>{
			console.log(data);
			if(data.res_code === 1){
				sessionStorage.loginUser = JSON.stringify(data.res_body.data);
				window.location.href = "/";
			}else{
				$(".login-error").removeClass('hidden');
			}
		})
		return false;
	}
})






new Login();
