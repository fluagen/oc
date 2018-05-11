import Router from 'koa-router';
import Topic from './controller/Topic';
import Sign from './controller/Sign';
import Group from './controller/Group';


const router = new Router();
const topic = new Topic();
const sign = new Sign();
const group = new Group();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
});

router.post('/signup', sign.signup);
router.post('/signin', sign.signin);

router.get('/api/topics', topic.list);
router.get('/api/topic/:tid', topic.get);
router.post('/topic', topic.put);

router.post('/group', group.put);

export default router;
