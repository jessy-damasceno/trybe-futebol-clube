import { Router } from 'express';
import * as loginMiddleware from '../middlewares/loginMiddleware';
import UsersController from '../controllers/users.controller';

const loginRouter = Router();

loginRouter.route('/')
  .post(loginMiddleware.fields, loginMiddleware.login, UsersController.login);

loginRouter.get('/validate', loginMiddleware.verifyToken, UsersController.getRole);

export default loginRouter;
