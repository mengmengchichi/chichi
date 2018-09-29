var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

//引入路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var billRouter = require('./routes/billrouter');
var supplierRouter = require('./routes/supplierrouter');
//创建应用
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//使用session中间件  可将一些东西存在在服务器端session中 服务器重启时会清除掉
app.use(session({
	secret:'yms',
	cookie:{
		maxAge:30*60*1000
	}
}));

//认证使用权限
//app.use(function(req,res,next){
//	//判断请求页面url
//	const {url} = req;
//	if(url.endsWith(".html") && url !== "/"){
//		//访问非首页资源时需要权限
//		if(req.session.loginUser){
//			//已登录
//			next();//可继续访问
//		}else{
//			//没有登录，跳到首页，并提示登录
//			res.redirect('/');
//			return;
//		}
//	}else{
//		next();
//	}
//});

//静态资源访问public目录
app.use(express.static(path.join(__dirname, 'public')));
//设置路由中间件
app.use('/', indexRouter);
app.use('/api/user', usersRouter);//访问、api/user目录资源
app.use('/api/bill',billRouter);
app.use('/api/supplier',supplierRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
