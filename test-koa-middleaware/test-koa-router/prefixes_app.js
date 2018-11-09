//测试koa的router中间件 prefixes
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
//统一给所有请求加上前缀
const router = new Router({
    prefix: "/api"
});

app.use(async(ctx, next) =>{
    await next();
});

//相应/api/
router.get("/", async(ctx, next) =>{
    ctx.body = "这是首页";
});

//注册路由器  allowedMethods补充响应头 无明显作用
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("server is running at 3000 port...");