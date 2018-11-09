//测试koa的router中间件 命名路由 redirect

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(async(ctx, next) =>{
    await next();
});

//user 为该路由的名称
router.get("user", "/getUser", async(ctx, next) =>{
    ctx.body = "路由重定向"
});
router.get("test", "/getTest/:id", async(ctx, next) =>{
    ctx.body = ctx.params;
});
//等价与
/* router.get('/login', ctx => {
    ctx.redirect('/getUser');
    ctx.status = 301;
}); */
router.redirect("/login", "user");

router.url("test", { id: 3 }, { query: { limit: 1 }  });

//注册路由器
app.use(router.routes()).use(router.allowedMethods());


app.listen(3000);
console.log("server is running at 3000 port...");