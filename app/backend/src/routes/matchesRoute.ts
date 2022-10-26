import { Router } from 'express';
import { isValidTeams, validateFields, validateTeams } from '../middlewares/matchMiddleware';
import matchesController from '../controllers/matches.controller';
import * as loginMiddleware from '../middlewares/loginMiddleware';

const matchesRouter = Router();

matchesRouter.patch('/:id/finish', matchesController.finishMatch);
matchesRouter.route('/:id')
  .patch(matchesController.updateMatch)
  .get(matchesController.getOne);

matchesRouter.route('/')
  .get(matchesController.getAll)
  .post(
    loginMiddleware.verifyToken,
    validateFields,
    validateTeams,
    isValidTeams,
    matchesController.create,
  );

export default matchesRouter;
