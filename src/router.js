import Router from 'koa-router';
import topic from './controller/topic';


const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
});

router.get('/topic', topic.list);

export default router;
