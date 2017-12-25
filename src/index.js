import Koa from 'koa';
let app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
