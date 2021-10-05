import { Router } from 'express';

import AuthenticationController from '../controllers/AuthenticationController';

const AuthenticationRouter = Router();
const authenticationController = new AuthenticationController();

AuthenticationRouter.get('/', authenticationController.createToken);

export default AuthenticationRouter;
