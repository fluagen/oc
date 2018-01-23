import Router from 'koa-router';
import topic from './controller/topic';
import sign from './controller/sign';


const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
});

router.get('/topic', topic.list);
router.post('/signup', sign.signup);

export default router;
