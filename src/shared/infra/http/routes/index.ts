import { Router } from 'express';

import authenticationRouter from '@modules/authentication/infra/http/routes/authentication.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/auth', authenticationRouter);
routes.use('/users', usersRouter);

export default routes;
