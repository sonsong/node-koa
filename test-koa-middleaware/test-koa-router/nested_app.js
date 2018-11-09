//测试koa的router 内嵌

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

var forums = new Router();
var posts = new Router();

//http://localhost:3000/forums/1/posts
posts.get('/', async(ctx, next) => {
    //{"fid":"1"}
    ctx.body = ctx.params;
});
//http://localhost:3000/forums/1/posts/2
posts.get('/:pid', async(ctx, next) => {
    //{"fid":"1","pid":"2"}
    ctx.body = ctx.params;
});

///forums/:fid/posts 所有的请求将会以/forums/:fid/posts作为前缀
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());
 
app.use(forums.routes());

app.listen(3000);
console.log("server is running at 3000 port...");