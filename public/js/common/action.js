//复用左侧导航栏
function Action(){
	this.createDom();
}

Action.template = `<div class="container-fluid" style="background-color: white;">
			<div class="list-group bg-info bg-success" style="width: 167px;margin-top: 10px;float: left;margin-right:20px">
			  <a href="#" class="list-group-item active text-center">
			   功能列表
			  </a>
			  <a href="/html/bill.html" class="list-group-item"><img src="/images/static/zd.png"/>账单管理</a>
			  <a href="/html/Supplier.html" class="list-group-item"><img src="/images/static/gys.png"/>供应商管理</a>
			  <a href="/html/user.html" class="list-group-item"><img src="/images/static/yh.png"/>用户管理</a>
			  <a href="javascript:;" class="list-group-item pwdchange"><img src="/images/static/mm.png" alt="" />密码修改</a>
			  <a href="#" class="list-group-item"><img src="/images/static/tc.png" alt="" />退出系统</a>
			</div>
			
			<div class="container content">
				<img src="/images/static/clock.jpg" style="float: left;margin:45px;"/>
				<div class="login-out-link hidden" style="margin-top: 74px;">
					<p style="font-size: 28px;color: #337AB7;">admin</p>
					
				</div>
				
				<div class="login-out-link" style="margin-top:98px;">
					<p style="font-size: 28px;color: #337AB7;">欢迎来到超市账单管理系统,请先登录</p>
				</div>
			</div>
			
		</div>`;
		
$.extend(Action.prototype,{
	//渲染DOM元素
	createDom(){
		$('.action').append(Action.template);
		//根据用户是否登录加载页面
		if(sessionStorage.loginUser){
			var session = JSON.parse(sessionStorage.loginUser);
		}		
		if(session){
			//存在用户登录
			$('.login-out-link').eq(0).removeClass('hidden').find('p').html(session.username);
			$('.login-out-link').eq(1).html("欢迎来到超市账单管理系统");
			
			//用户登录后可以到达修改密码界面
			$('.pwdchange').on('click',window.location.href = "/html/password.html");
		}
	},	
})







//创建实例
new Action();