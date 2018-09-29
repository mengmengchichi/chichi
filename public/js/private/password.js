//渲染密码管理页面

function Password(){
	this.createCon();
	this.addListener();
}

Password.template = `<div class="content">
			<div class="content-header" style="height: 30px;line-height: 30px;">
				<img src="../images/static/home.png" style="margin-right: 5px;"/>您现在的位置是:<span style="color: #00B7FF;">密码修改界面</span>
			</div>
			<form class="pwdchange-form">
			  <div class="form-group">
			    <label for="exampleInputEmail1">旧密码:</label>
			    <input type="password" class="form-control" name="password" id="exampleInputEmail1" placeholder="请输入密码">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputPassword1">新密码:</label>
			    <input type="password" class="form-control" name="passwordnew"  id="exampleInputPassword1" placeholder="请输入新密码">
			  </div>
			  <div class="form-group">
			    <label for="exampleInputFile">确认新密码:</label>
			    <input type="password" id="exampleInputFile" class="form-control" name="passwordOK" placeholder="请再次输入新密码">
			  </div>

			  <button type="submit" class="btn btn-default btn-primary pwdsave" style="">保存</button>
			</form>
			
		</div>`;
		
$.extend(Password.prototype,{
	//渲染页面
	createCon(){
		$('.content').html(Password.template);
		$('.list-group').find('a').eq(4).attr('style',"background:#4cae4c");
	},
	//注册事件监听
	addListener(){
		$('.pwdsave').on('click',this.pwdchange);
	},
	pwdchange(){
		const url = "/api/user/update",
		formData = $('.pwdchange-form').serialize();
		$.post(url,formData,(data)=>{
	//		console.log(data);
			const curr = data.res_code;
			if(curr){
				alert('修改成功,请重新登录');
			}else{
				alert('修改失败,请重试');
			}
		})
		return false;
	}
})






new Password();

