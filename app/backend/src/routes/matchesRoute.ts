import { Router } from 'express';
import { isValidTeams, validateFields, validateTeams } from '../middlewares/matchMiddleware';
import matchesController from '../controllers/matches.controller';
import * as loginMiddleware from '../middlewares/loginMiddleware';

const matchesRouter = Router();

matchesRouter.route('/')
  .get(matchesController.getAll)
  .post(
    loginMiddleware.verifyToken,
    validateFields,
    validateTeams,
    isValidTeams,
    matchesController.create,
  );

matchesRouter.get('/:id', matchesController.getOne);

matchesRouter.patch('/:id/finish', matchesController.finishMatch);

export default matchesRouter;
