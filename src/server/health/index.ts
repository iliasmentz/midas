import Router from 'koa-router';
import handle from './handle';

const router = new Router();

router.get('/health', handle);

export default router;
