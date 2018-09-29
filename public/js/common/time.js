//定义事件提示对象
function Timer(){
	this.createDom();
	this.timeCue();
	this.timeGet();
}

Timer.template = `<div class="container">
			<div class="row">			  
			  <div class="col-md-8 timer"><div class="col-md-1" style="padding:0;width:26px"><img src="../images/static/time.png"/></div><span></span>年<span></span>月<span></span>日<span></span>   星期<span></span></div>
			  <div class="col-md-4" style="font-size: 12px;">温馨提示：为了您能够正常浏览，请尽量使用高版本浏览器!(IE10+)</div>
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
		setInterval(this.timeGet.bind(this),1000);
	},
	timeGet(){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var Week = ['日','一','二','三','四','五','六'];
		var weekDay = date.getDay();
		$('.timer span').eq(0).html(year).next().html(month+1).next().html(day).next().html("&nbsp;" + hours + ":" + minutes + ":" + seconds).next().html(Week[weekDay]);
	}
})




//创建时间提示对象
new Timer();

