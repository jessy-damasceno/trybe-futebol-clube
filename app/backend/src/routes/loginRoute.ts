import { Router } from 'express';
import * as loginMiddleware from '../middlewares/loginMiddleware';
import UsersController from '../controllers/users.controller';

const loginRouter = Router();

loginRouter.route('/')
  .post(loginMiddleware.fields, loginMiddleware.login, UsersController.login);

export default loginRouter;
