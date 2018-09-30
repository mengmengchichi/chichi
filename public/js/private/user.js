//用户管理界面业务

function User(){
	this.page = 1;
	this.count = 2;
	this.createCon();
	this.addListener();
	this.load();
	this.loadpagination();
}

User.template = `<div class="content">
			<div class="content-header" style="height: 30px;line-height: 30px;">
				<img src="../images/static/home.png" style="margin-right: 5px;"/>您现在的位置是:<span style="color: #00B7FF;">用户管理页面</span>
			</div>
			<div class="form" style="height: 50px;vertical-align:middle;border: 1px solid #C0C0C0;">
				<form class="form-inline" style="margin-top: 7px;">
				  <div class="form-group">
				    用户名称：<input type="text" class="form-control" id="usernamesel" placeholder="请输入用户名称">
				  </div>
				  <button type="submit" class="btn btn-default btn-success"><img src="../images/static/search.png" alt="" />查询</button>
				  <a class="btn btn-primary" style="float: right;margin-right: 50px;" data-toggle="modal" data-target="#usermodal">添加用户</a>	
				</form>
			</div>	
			
			<div class="table-responsive">
			  <table class="table table-bordered text-center">
			    <thead>
			    	<tr>
			    		<th>用户编码</th>
			    		<th>用户名称</th>
			    		<th>性别</th>
			    		<th>年龄</th>
			    		<th>电话</th>
			    		<th>用户类型</th>
			    		<th>操作</th>
			    	</tr>
			    </thead>
			    <tbody>
			    	
			    </tbody>
			  </table>
			</div>
		</div>`;
		
$.extend(User.prototype,{
	createCon(){
		$('.content').html(User.template);
		$('.list-group').find('a').eq(3).attr('style',"background:#4cae4c");
	},
	//注册事件监听
	addListener(){
		$('.userinsert').on('click',this.insertHandler);
	},
	insertHandler(){
		const url = "/api/user/insert",
		formData = $('.form-insert').serialize();
		$.post(url,formData,(data)=>{
			const curr = data.res_body.data;
			if(!curr){
				$('.alert-warning').removeClass('hidden');
				return;
			}
			var html = "";
			var birth=curr.userborn;
			birth = Date.parse(birth.replace('/-/g', "/"));
			if (birth) {
			  var year = 1000 * 60 * 60 * 24 * 365;
			  var now = new Date();
			  var birthday = new Date(birth);
			  var age = parseInt((now - birthday) / year);
			}
			html += `<tr>
			    		<td>${curr.usercode}</td>
			    		<td>${curr.username}</td>
			    		<td>${curr.usersex}</td>
			    		<td>${age}</td>
			    		<td>${curr.userphone}</td>
			    		<td>${curr.authority}</td>
			    		<td>
			    			<a href="javascript:;" class=""><img src="../images/static/read.png"/></a>
			    			<a href="javascript:;" class="edit"><img src="../images/static/xiugai.png" title="编辑"/></a>
			    			<a href="javascript:;" class="delete"><img src="../images/static/delete.png" title="删除"/></a>
			    		</td>
			    	</tr>`;
			  
			$('#usermodal').modal('hide');
			$('.table tbody').append(html);
		});
	},
	//页面加载时加载一些用户信息
	load(page,count){
		page = page || this.page;
		count = count || this.count;
		const url = "/api/user/load",		
		data = {
			act:'load',
			page:page,
			count:count
		};
		$.get(url,data,(data)=>{
			var html = '';
			data = data.res_body.data;
			data.forEach(function(curr,index){
				var birth=curr.userborn;
				birth = Date.parse(birth.replace('/-/g', "/"));
				if (birth) {
				  var year = 1000 * 60 * 60 * 24 * 365;
				  var now = new Date();
				  var birthday = new Date(birth);
				  var age = parseInt((now - birthday) / year);
				}
				html += `<tr>
			    		<td>${curr.usercode}</td>
			    		<td>${curr.username}</td>
			    		<td>${curr.usersex}</td>
			    		<td>${age}</td>
			    		<td>${curr.userphone}</td>
			    		<td>${curr.authority}</td>
			    		<td>
			    			<a href="javascript:;" class=""><img src="../images/static/read.png"/></a>
			    			<a href="javascript:;" class="edit"><img src="../images/static/xiugai.png" title="编辑"/></a>
			    			<a href="javascript:;" class="delete"><img src="../images/static/delete.png" title="删除"/></a>
			    		</td>
			    	</tr>`;
			})
						
			$('#usermodal').modal("hide");
			$('.table tbody').html(html);
		})
	},
	//加载分页按钮
	loadpagination(){
		const url = "/api/user/loadpage",
		data = {
			act:'pagination',
		}
		$.get(url,data,(data)=>{
			var pageCount = Math.ceil(data.res_body.data/this.count);
			var pagination = `
			  <ul class="pagination">
			    <li>
			      <a href="javascript:;" aria-label="Previous" class="pageToPrev">
			        <span aria-hidden="true" class="pageToPrev">&laquo;</span>
			      </a>
			    </li>`;
			for(var i = 0;i<pageCount;i++){
				if(i == 0){
					pagination += '<li class="active"><a href="javascript:;">1</a></li>'
				}else{
					pagination += '<li><a href="javascript:;">' + (i+1) + '</a></li>';
				}				
			}
			pagination += `<li>			      
		      <a href="javascript:;" aria-label="Next" class="pageToNext">
		        <span aria-hidden="true" class="pageToNext">&raquo;</span>
		      </a>
		    </li>` ;
		    
		    $('.pagination').append(pagination);
		})
	},	
	
	
	
	
})
		
		
		
		
		
new User();		
