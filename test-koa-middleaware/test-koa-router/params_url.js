//测试koa的router中间件

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(async(ctx, next) =>{
    await next();
});

let users = [];
router.get("user", "/getId/:id", async(ctx, next) =>{
    ctx.body = ctx.params;
})
router
  .param('user', (id, ctx, next) => {
    ctx.user = users[id];
    if (!ctx.user) return ctx.status = 404;
    return next();
  })
  .get('/users/:user', ctx => {
    ctx.body = ctx.user;
  })
  .get('/users/:user/friends', ctx => {
    ctx.body = "friends";
  })

//注册路由器
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("server is running at 3000 port...");