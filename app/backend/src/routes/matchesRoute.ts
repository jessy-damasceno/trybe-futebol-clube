import { Router } from 'express';
import teamsController from '../controllers/teams.controller';

const matchesRouter = Router();

matchesRouter.get('/', teamsController.getAll);
matchesRouter.get('/:id', teamsController.getOne);

export default matchesRouter;
