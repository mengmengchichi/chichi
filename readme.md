# 管理系统

前后端分离 

前端资源放置在 public 目录下，public 目录下主要放置的是静态资源（html、css、js、图像）

public 目录结构

	css - 外部CSS文件
	js - 自定义的JS文件
	images - 图片
	lib - 放置第三方库
		jquery 
		bootstrap
	html - 放置HTML子页面
		position.html - 职位管理页面
	index.html - 首页（主页）

gitee(码云：https://gitee.com)
		
	创建远程仓库
	git remote 
	git push

本地仓库

	git init
	git add .
	git commit -m ''

storage
	localStorage
		setItem(key, value)
		getItem(key)
		removeItem(key)
		clear()
	
		localStorage.<key> = value;
		localStorage.<key>;

	sessionStorage

三层架构：

	public -- 表现层(前端)
	services -- 业务逻辑层(后端)
	dao -- 数据访问层(后端)

svg-captcha：生成验证码

	https://www.npmjs.com/package/svg-captcha

1. 安装：npm install(i) svg-captcha --save(-S)
2. 使用：

express-session：session会话处理
	
	https://www.npmjs.com/package/express-session

1. 安装：npm install express-session -S
2. 使用：
	在 app.js 中添加：
		var session = require("express-session");
		app.use(session({
			secret: "aldskjflkadsjfalkdsfjlkdsajf",
			cookie : {
				maxAge : 30 * 60 * 1000
			}
		}));

mongoose：MongoDB数据库操作

	https://mongoosejs.com/

1. 安装：npm install mongoose -S
2. 使用：
	a. 引入模块 
	b. 连接数据库
	c. 创建 schema
	d. 根据 schema 创建模型
	e. 根据模型创建模型实例
	f. 调用模型方法：save() 保存    find() 查询 .......

bcrypt：加密

	https://www.npmjs.com/package/bcrypt

1. 安装：npm install bcrypt -S
2. 使用：
	
multer：文件上传
	
	https://www.npmjs.com/package/multer

1. 安装
2. 使用
	前端：FormData

	
