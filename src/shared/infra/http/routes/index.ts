import { Router } from 'express';

import authenticationRouter from '@modules/authentication/infra/http/routes/authentication.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import accountsRouter from '@modules/accounts/infra/http/routes/accounts.routes';
import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';

const routes = Router();

routes.use('/auth', authenticationRouter);
routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/transactions', transactionsRouter);

export default routes;
