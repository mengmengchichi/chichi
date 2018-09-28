//定义事件提示对象
function Timer(){
	this.createDom();
	this.timeCue();
}

Timer.template = `<div class="container">
			<div class="row">
			  <div class="col-md-8 timer"><span></span>年<span></span>月<span></span>日<span></span>星期<span></span></div>
			  <div class="col-md-4" style="font-size: 12px;">温馨提示：为了您能够正常浏览，尽量使用高版本浏览器!(IE10+)</div>
			</div>
		</div>`;
		
//扩展对象原型方法
$.extend(Timer.prototype,{
	//创建时间提示DOM元素
	createDom(){
		$('.time').append(Timer.template);
	},
	//设置时间提示
	timeCue(){		
		setInterval(function(){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var now = date.getTime();
			console.log(console.log(now));
		},1000);
	}
})




//创建时间提示对象
new Timer();

