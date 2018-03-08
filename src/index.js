import Koa from "koa";
import bodyParser from "koa-bodyparser";
import jwtKoa from "koa-jwt";
import cors from "koa2-cors";
import router from "./router";

const app = new Koa();
app.use(cors());

app.use(bodyParser());
app.use(jwtKoa({secret: 'occc' }).unless({
  path: [/^\/signin/, /^\/signup/]
}));

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
