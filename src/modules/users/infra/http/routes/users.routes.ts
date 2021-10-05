import { Router } from 'express';

import ensureAuthenticated from '@modules/authentication/infra/http/middleware/ensureAuthenticated';
import UsersController from '../controllers/UsersController';

const UsersRouter = Router();
const usersController = new UsersController();

UsersRouter.use(ensureAuthenticated);

UsersRouter.post('/', usersController.create);

export default UsersRouter;
