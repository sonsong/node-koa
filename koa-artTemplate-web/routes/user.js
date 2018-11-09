//用户模块
const router = require('koa-router')();

//进入首页
router.get('/', async(ctx, next) =>{
    ctx.render('user/index');
});

//写文章
router.get('write', async(ctx, next) =>{
    ctx.render('user/md-edit');
});

//发表文章
router.post('submitArtcle', async(ctx, next) =>{
    let md = ctx.request.body;
});

//test
router.get('editor', async(ctx, next) =>{
    ctx.render('user/editor');
});

module.exports = router;