//供应商页面管理

function Supplier(){
	this.createCon();
	this.addListener();
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
	}
})







new Supplier();