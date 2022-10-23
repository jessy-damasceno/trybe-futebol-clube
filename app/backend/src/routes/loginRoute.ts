import { Router } from 'express';

const loginRouter = Router();

loginRouter.route('/')
  .post();

export default loginRouter;
