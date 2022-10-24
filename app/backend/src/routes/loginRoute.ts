import { Router } from 'express';
import * as loginMiddleware from '../middlewares/loginMiddleware';

const loginRouter = Router();

loginRouter.route('/')
  .post(loginMiddleware.fields);

export default loginRouter;
