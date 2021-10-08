import { Router } from 'express';

import ensureAuthenticated from '@modules/authentication/infra/http/middleware/ensureAuthenticated';
import AccountsController from '../controllers/AccountsController';

const AccountsRouter = Router();
const accountsController = new AccountsController();

AccountsRouter.use(ensureAuthenticated);

AccountsRouter.post('/', accountsController.create);
AccountsRouter.get('/balance/:idAccount', accountsController.getBalance);
AccountsRouter.patch('/block/:idAccount', accountsController.blockAccount);
AccountsRouter.patch('/withdraw', accountsController.withdraw);
AccountsRouter.patch('/deposit', accountsController.deposit);

export default AccountsRouter;
