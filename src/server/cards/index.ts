import Router from 'koa-router';
import {handleCardTokenization} from './handle';

const router = new Router({prefix: '/cards'});

router.post('/tokenize', handleCardTokenization);

export default router;
