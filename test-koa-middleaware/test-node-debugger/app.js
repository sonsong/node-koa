const Koa = require('koa');
const app = new Koa();

app.use(async(ctx, next) =>{
    ctx.body = "test node debugger";
})

app.listen(3000);
console.log('server is running at 3000...');