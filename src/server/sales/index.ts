import Router from 'koa-router';
import {handleSaleRequest} from './handle';

const router = new Router();

router.post('/sales', handleSaleRequest);

export default router;
