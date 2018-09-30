//供应商页面管理

function Supplier(){
	this.page = 1;
	this.count = 4;
	this.createCon();
	this.addListener();
	this.load();
	this.loadpagination();
}

Supplier.template = `<div class="content">
			<div class="content-header" style="height: 30px;line-height: 30px;">
				<img src="../images/static/home.png" style="margin-right: 5px;"/>您现在的位置是:<span style="color: #00B7FF;">供应商管理页面</span>
			</div>
			<div class="form" style="height: 50px;vertical-align:middle;border: 1px solid #C0C0C0;">
				<form class="form-inline" style="margin-top: 7px;">
				  <div class="form-group">
				    供应商名称：<input type="text" class="form-control" name="suppliername" id="suppliername" placeholder="请输入供应商名称">
				  </div>
				  <button type="submit" class="btn btn-default btn-success"><img src="../images/static/search.png" alt="" />查询</button>
				  <a class="btn btn-primary" style="float: right;margin-right: 50px;" data-toggle="modal" data-target="#suppliermodal">添加供应商</a>	
				</form>
			</div>	
			
			<div class="table-responsive">
			  <table class="table table-bordered text-center">
			    <thead>
			    	<tr>
			    		<th>供应商编码</th>
			    		<th>供应商名称</th>
			    		<th>联系人</th>
			    		<th>联系电话</th>
			    		<th>联系地址</th>
			    		<th>传真</th>
			    		<th>创建时间</th>
			    		<th>操作</th>
			    	</tr>
			    </thead>
			    <tbody>

			    </tbody>
			  </table>
			</div>
		</div>`;
		
$.extend(Supplier.prototype,{
	createCon(){
		$('.content').html(Supplier.template);
		$('.list-group').find('a').eq(2).attr('style',"background:#4cae4c");
	},
	//注册事件监听
	addListener(){
		//添加事件
		$('.supplierinsert').on('click',this.insertHandler);		
		$('.pagination').on('click','li',this.loadByPage.bind(this));
	},
	insertHandler(){
		const url = "/api/supplier/insert",
		formData = $('.supplier-form').serialize();
		$.get(url,formData,(data)=>{
			var html = '';
			var curr = data.res_body.data;
			html += `<tr>
	    		<td>${curr.suppliercode}</td>
	    		<td>${curr.suppliername}</td>
	    		<td>${curr.linkman}</td>
	    		<td>${curr.linkphone}</td>
	    		<td>${curr.linkaddress}</td>
	    		<td>${curr.supplierfax}</td>
	    		<td>${curr.suppliertime}</td>
	    		<td>
			    			<a href="javascript:;" class=""><img src="../images/static/read.png"/></a>
			    			<a href="javascript:;" class="edit"><img src="../images/static/xiugai.png" title="编辑"/></a>
			    			<a href="javascript:;" class="delete"><img src="../images/static/delete.png" title="删除"/></a>
	    		</td>
	    	</tr>`;
	    	
	    	$('#suppliermodal').modal('hide');
	    	$('.table tbody').append(html);
		});
	},
	//页面加载时加载已有供应商
	load(page,count){
		page = page || this.page;
		count = count || this.count;
		const url = '/api/supplier/load',
		data = {
			act:'load',
			page:page,
			count:count
		};
		$.get(url,data,(data)=>{
			var html = "";
			var value = data.res_body.data;
			value.forEach((curr,index)=>{
				html += `<tr>
	    		<td>${curr.suppliercode}</td>
	    		<td>${curr.suppliername}</td>
	    		<td>${curr.linkman}</td>
	    		<td>${curr.linkphone}</td>
	    		<td>${curr.linkaddress}</td>
	    		<td>${curr.supplierfax}</td>
	    		<td>${curr.suppliertime}</td>
	    		<td>
			    			<a href="javascript:;" class=""><img src="../images/static/read.png"/></a>
			    			<a href="javascript:;" class="edit"><img src="../images/static/xiugai.png" title="编辑"/></a>
			    			<a href="javascript:;" class="delete"><img src="../images/static/delete.png" title="删除"/></a>
	    		</td>
	    	</tr>`;	    	
	    	$('#suppliermodal').modal('hide');
	    	$('.table tbody').html(html);
			})
		})
	},
	//加载分页按钮
	loadpagination(){
		const url = "/api/supplier/load",
		data = {
			act:'pagination'
		};
		$.get(url,data,(data)=>{
			var pageCount = Math.ceil(data.res_body.data/this.count);
			var pagination = `<ul class="pagination">
			    <li>
			      <a href="javascript:;" aria-label="Previous" class="pageToPrev">
			        <span aria-hidden="true" class="pageToPrev">&laquo;</span>
			      </a>
			    </li>`;
			
			for(var i = 0;i<pageCount;i++){
				if(i === 0){
					pagination += '<li class="active"><a href="javascript:;">1</a></li>';
				}else{
					pagination += '<li><a href="javascript:;">' + (i+1) + '</a></li>';
				}
			}
			
			pagination += `<li>			      
		      <a href="javascript:;" aria-label="Next" class="pageToNext">
		        <span aria-hidden="true" class="pageToNext">&raquo;</span>
		      </a>
		    </li>`;
		    
		    $('.pagination').append(pagination);
		})
	},
	//数据分页处理
	loadByPage(event){
		const src = event.target;
		console.log(src);
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
	}
})














new Supplier();