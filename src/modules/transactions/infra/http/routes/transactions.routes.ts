import { Router } from 'express';

import ensureAuthenticated from '@modules/authentication/infra/http/middleware/ensureAuthenticated';
import TransactionsController from '../controllers/TransactionsController';

const TransactionsRouter = Router();
const transactionsController = new TransactionsController();

TransactionsRouter.use(ensureAuthenticated);

TransactionsRouter.get('/:idAccount', transactionsController.extract);

export default TransactionsRouter;
