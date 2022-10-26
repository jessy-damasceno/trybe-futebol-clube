import { Router } from 'express';
import matchesController from '../controllers/matches.controller';
import * as loginMiddleware from '../middlewares/loginMiddleware';

const matchesRouter = Router();

matchesRouter.route('/')
  .get(matchesController.getAll)
  .post(loginMiddleware.verifyToken, matchesController.create);

matchesRouter.get('/:id', matchesController.getOne);

export default matchesRouter;
