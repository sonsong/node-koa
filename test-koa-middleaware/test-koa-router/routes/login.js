const Router = require('koa-router');
const router = new Router();

router.get("/", async(ctx, next) =>{
    ctx.body = "登陆页面";
});

router.get("/get/:id", async(ctx, next) =>{
    ctx.body = ctx.params;
});

module.exports = router;