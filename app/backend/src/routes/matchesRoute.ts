import { Router } from 'express';
import matchesController from '../controllers/matches.controller';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.get('/:id', matchesController.getOne);

export default matchesRouter;
