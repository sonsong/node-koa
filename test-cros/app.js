const Koa = require('koa');
        app = new Koa(),
        router = require('koa-router')();

app.use(async (ctx, next) =>{
    //进行跨域处理 设置运行跨域请求的地址
    //如果前台发送的请求被允许携带cookie信息，这个不能设置为*号
    ctx.set('Access-Control-Allow-Origin', ctx.header.origin);
    //允许浏览器携带cookies访问
    ctx.set('Access-Control-Allow-Credentials', true);
    //getResponseHeader 获取自定义的请求头 
    /* ctx.set('Access-Control-Expose-Headers', 'aaa');*/
    await next();
});
router.get("/testCookie", async (ctx, next) =>{
    //maxAge: 必选项
    ctx.cookies.set('address', 'aaa', {
        maxAge: 5 * 60 * 1000,
        httpOnly: false,
    });
    console.log(ctx.cookies.get('address'));
    console.log(ctx.cookies.get('age'));
    ctx.status = 200;
});
//对options请求做特殊处理
router.options("/addUser", async (ctx, next) =>{
    //复杂请求需要配置 运行访问的方法
    ctx.set('Access-Control-Allow-Methods', "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    //setRequestHeader('X-Custom-Header', 'value') 额外发送的请求头
    ctx.set('Access-Control-Allow-Headers', 'xxxx');
    //设置预处理访问的有效时间 20天
    ctx.set('Access-Control-Max-Age', 1728000);
    ctx.status = 200
});
router.put('/addUser', async (ctx, next) =>{
    ctx.set('content-type', 'application/json');
    ctx.body = {mess: 'add success...'};
});

//测试jsonp 跨域
router.get('/getUserName', async (ctx, next) =>{
    let callback = ctx.request.query.callback;
    ctx.set('content-type', 'application/json');
    ctx.body = `${callback}(${JSON.stringify({name: 'haungss'})})`;
})
app.use(router.routes());
app.listen(3000);
console.log('server is running at port 3000...');