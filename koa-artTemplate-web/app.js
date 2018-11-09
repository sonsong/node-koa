const Koa = require('koa'),
        Router = require('koa-router'),
        static_server = require('koa-static'),
        render = require('koa-art-template'),
        path = require('path'),
        bodyParser = require('koa-bodyparser'),
        app = new Koa(),
        router = new Router();

//用户模块相关路由
const user = require('./routes/user');
//管理员模块相关路由
const admin = require('./routes/admin');

app.use(async(ctx, next) =>{
    await next();
});

//注册art-template模板解析器
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//处理post请求参数
app.use(bodyParser());

//处理静态文件
app.use(static_server(path.join(__dirname, 'static')));

router.use('/', user.routes());
router.use('/admin', admin.routes());

//注册路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log('node server is running at 3000 port...');