import Router from 'koa-router';
import Topic from './controller/Topic';
import Sign from './controller/Sign';


const router = new Router();
const topic = new Topic();
const sign = new Sign();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
});

router.get('/topic', topic.list);
router.post('/topic', topic.put);
router.post('/signup', sign.signup);
router.post('/signin', sign.signin);

export default router;
