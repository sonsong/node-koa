//测试koa的router中间件 router.url(path, params)

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(async(ctx, next) =>{
    await next();
});

let str = Router.url("/getId/:id", {id: 1});
console.log(str);// /getId/1

//注册路由器
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("server is running at 3000 port...");