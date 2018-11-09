//测试koa的router Multiple middleware
const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

app.use(async(ctx, next) =>{
    await next();
});

//router.all() 可以匹配所有的请求方式
router.get("/", async(ctx, next) =>{
    ctx.body = "这是首页";
});


router.get('/users/:id',
    async(ctx, next) => {
        console.log("first");
        ctx.body = ctx.params.id;
        ctx.id = ctx.params.id;
        await next();
        console.log("first-1");
    },
    async(ctx, next) => {
        setTimeout(()=>{
            console.log("second");
        }, 3000);
        await next()
        console.log("second-1");
    },
    async(ctx) => {
        console.log("third");
    }
);

//注册路由器
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log("server is running at 3000 port...");