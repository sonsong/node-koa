//测试koa的router中间件

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(async(ctx, next) =>{
    await next();
});

//router.all() 可以匹配所有的请求方式
router.get("/", async(ctx, next) =>{
    ctx.body = "这是首页";
});

//注册路由器
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("server is running at 3000 port...");