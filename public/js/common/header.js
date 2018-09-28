function Header(){
	this.createDom();
	this.addListener();
}

Header.template = `<nav class="navbar" style="background-color: #337AB7;">
		  <div class="container-fluid">
		    <div class="navbar-header">
		    	<a class="navbar-brand" href="/" style="margin-top: -9px;">
		         <img alt="Brand" src="/images/static/buy.png">
		        </a>
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="/" style="color: white;">超市账单管理系统</a>
		    </div>
	
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      
		      <ul class="nav navbar-nav navbar-right reg-login-link">
		        <li data-toggle="modal" data-target="#loginModal" style="margin-right:10px;margin-top: 8px;"><button type="button" class="btn btn-primary btn-success loginBtn">登录</button></li>
		        <li data-toggle="modal" data-target="#regModal" style="margin-right:10px;margin-top: 8px;"><button type="button" class="btn btn-primary btn-success registBtn">注册</button></li>
		      </ul>
		      <ul class="nav navbar-nav navbar-right hidden welcome-logout-link">
		        <li><a href="#" style="color: white;">欢迎：</a></li>
		        <li><a href="javascript:void(0)" class="logout-link" style="color: white;">退出</a></li>
		      </ul>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>`;

$.extend(Header.prototype,{
	//创建头部DOM节点
	createDom(){
		//将头部加入header中
		$('.header').append(Header.template);
	},
	//加载用户信息
	loadUser(){
		//从sessionStorage 中获取成功时的用户信息
		let user = sessionStorage.loginUser;
		if(!user) //没有登录成功的用户，结束函数调用
			return;
		
		user = JSON.parse(user);
		$(".reg-login-link").hide().next('.welcome-logout-link').removeClass('hidden').find('a:first').text("欢迎:" + user.username);
	},
	//注册按钮事件
	addListener(){
		//点击退出按钮，退出登录
		$('.logout-link').on('click',this.logoutHandler);
		//登录按钮跳转到登录页面
		$('.loginBtn').on('click',function(){
			location.href = '/html/login.html';
		})
	},
	//退出事件处理
	logoutHandler(){}
})
















//创建Header对象

new Header();
