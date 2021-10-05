import { Router } from 'express';

import authenticationRouter from '@modules/authentication/infra/http/routes/authentication.routes';

const routes = Router();

routes.use('/auth', authenticationRouter);

export default routes;
