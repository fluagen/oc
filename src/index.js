import Koa from "koa";
import bodyParser from "koa-bodyparser";
import router from "./router";

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
  }
});

app.use(router.routes());

app.listen(3000);
