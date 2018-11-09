//路由嵌套
const Koa = require('koa');
const Router = require('koa-router');

const loginRoutes = require('./routes/login');

const app = new Koa();
const router = new Router();

app.use(async(ctx, next) =>{
    await next();
});

//使用/api作为前缀
router.use("/api", loginRoutes.routes(), loginRoutes.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("server is running at 3000 port...");