const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const static = require('koa-static');

const app = new Koa();
const router = new Router();

const staticPath = './public';
app.use(static(path.join(__dirname, staticPath)));

router.get('/', async ( ctx )=>{
    let html = `
      <ul>
        <li><a href="/page/helloworld">/page/helloworld</a></li>
        <li><a href="/page/404">/page/404</a></li>
      </ul>
    `
    ctx.body = html
  })

app
    .use(router.routes())
    .use(router.allowedMethods);





app.listen(3000, () => {
    console.log('server running at port 3000');
})