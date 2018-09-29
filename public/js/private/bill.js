//账单管理界面业务对象

function Bill(){
	this.page = 1;
	this.count = 3;
	this.createCon();
	this.addListener();
	this.load();
	this.loadpagination();
}
//内容界面
Bill.template = `		<div class="content">
			<div class="content-header" style="height: 30px;line-height: 30px;">
				<img src="../images/static/home.png" style="margin-right: 5px;"/>您现在的位置是:<span style="color: #00B7FF;">账单管理页面</span>
			</div>
			<div class="form" style="height: 50px;vertical-align:middle;">
				<form class="form-inline" style="margin-top: 7px;">
				  <div class="form-group">
				    商品名称：<input type="text" class="form-control" id="goodsname" placeholder="请输入商品名称">
				  </div>
				  <div class="form-group">
				    供应商：<select class="form-control">
				    	<option value="" selected="true">--请选择--</option>
						  <option>1</option>
						  <option>2</option>
						  <option>3</option>
						  <option>4</option>
						  <option>5</option>
						</select>
				  </div>
				  <div class="form-group">
				    是否付款：<select class="form-control">
				    	<option value="" selected="true">--请选择--</option>
						  <option>是</option>
						  <option>否</option>
						</select>
				  </div>
				  <button type="submit" class="btn btn-default btn-success"><img src="../images/static/search.png" alt="" />查询</button>
				  <a class="btn btn-primary" style="float: right;margin-right: 50px;" data-toggle="modal" data-target="#billmodal">添加订单</a>	
				</form>
			</div>		
			<div class="table-responsive">
			  <table class="table table-bordered text-center">
			    <thead>
			    	<tr>
			    		<th>账单编号</th>
			    		<th>商品名称</th>
			    		<th>商品单位</th>
			    		<th>供应商</th>
			    		<th>数量</th>
			    		<th>账单金额</th>
			    		<th>是否支付</th>
			    		<th>创建时间</th>
			    		<th>操作</th>
			    	</tr>
			    </thead>
			    <tbody>
			    	
			    </tbody>
			  </table>
			</div>
		</div>`;
	
//扩展对象方法
$.extend(Bill.prototype,{
	//渲染内容
	createCon(){
		$('.content').html(Bill.template);
		$('.list-group').find('a').eq(1).attr('style',"background:#4cae4c");
	},
	//页面加载时加载已有账单
	load(page,count){
		page = page || this.page;
		count = count || this.count;
		const url = "/api/bill/load",		
		data = {
			act:'load',
			page:page,
			count:count
		};
		$.get(url,data,(data)=>{
			var html = '';
			var value = data.res_body.data;
			value.forEach(function(curr,index){
				html += `<tr>
			    		<td>${curr._id}</td>
			    		<td>${curr.goodsname}</td>
			    		<td>${curr.goodsunit}</td>
			    		<td>${curr.Supplier}</td>
			    		<td>${curr.goodscount}</td>
			    		<td>${curr.totalprice}</td>
			    		<td>${curr.payment}</td>
			    		<td>${curr.billtime}</td>
			    		<td>
			    			<a href="javascript:;" class=""><img src="../images/static/read.png"/></a>
			    			<a href="javascript:;" class="edit"><img src="../images/static/xiugai.png" title="编辑"/></a>
			    			<a href="javascript:;" class="delete"><img src="../images/static/delete.png" title="删除"/></a>
			    		</td>
			    	</tr>`;
			})
			
			$('#billmodal').modal("hide");
			$('.table tbody').html(html);
		})
	},
	//加载分页按钮
	loadpagination(){
		const url = "/api/bill/load",
		data = {
			act:'pagination',
		}
		$.get(url,data,(data)=>{
			var pageCount = Math.ceil(data.res_body.data/this.count);
			var pagination = `
			  <ul class="pagination">
			    <li>
			      <a href="javascript:;" aria-label="Previous" class="pageToPrev">
			        <span aria-hidden="true">&laquo;</span>
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
		        <span aria-hidden="true">&raquo;</span>
		      </a>
		    </li>` ;
		    
		    $('.pagination').append(pagination);
		})
	},	
	//数据分页处理
	loadByPage(event){
		const src = event.target;
		if(isNaN(Number($(src).text()))){
			if($(src).hasClass("pageToPrev")){
				this.page <= 1? this.page = 1 : this.page--;
				if(this.page == 1){
					$('.pageToPrev').parent().attr('disabled',"true");					
				}
			} 
			if($(src).hasClass('pageToNext')){
				this.page >= this.pageCount? this.page = this.pageCount : this.page++;
				if(this.page == this.pageCount){
					$('.pageToNext').parent().addClass('disabled');
				} 
			} 			
		}else{
			this.page = Number($(src).text());
			if(this.page == 1){
				$('.pageToPrev').parent().addClass('disabled');
			}else if(this.page == this.pageCount){
				$('.pageToNext').parent().addClass('disabled');
			} 
		}
		$('.pagination li').eq(this.page).addClass('active').siblings().removeClass('active');
		//加载页面
		console.log(this.page);
		this.load(this.page);
				
		return false;
	},
	
	
	//注册事件监听
	addListener(){
		$('.insert').on('click',this.insertHandler);
		$('.pagination').on('click',this.loadByPage.bind(this));
	},
	//添加账单处理
	insertHandler(){
		const url = "/api/bill/insert",
		formData = $('.form-insert').serialize();
		$.get(url,formData,(data)=>{
			var html = '';
			var curr = data.res_body.data;
			html += `<tr>
			    		<td>${curr._id}</td>
			    		<td>${curr.goodsname}</td>
			    		<td>${curr.goodsunit}</td>
			    		<td>${curr.Supplier}</td>
			    		<td>${curr.goodscount}</td>
			    		<td>${curr.totalprice}</td>
			    		<td>${curr.payment}</td>
			    		<td>${curr.billtime}</td>
			    		<td>
			    			<a href="javascript:;" class=""><img src="../images/static/read.png"/></a>
			    			<a href="javascript:;" class="edit"><img src="../images/static/xiugai.png" title="编辑"/></a>
			    			<a href="javascript:;" class="delete"><img src="../images/static/delete.png" title="删除"/></a>
			    		</td>
			    	</tr>`;
			$('#billmodal').modal("hide");
			$('.table tbody').append(html);
		});
	}
})







//创建账单对象
new Bill();