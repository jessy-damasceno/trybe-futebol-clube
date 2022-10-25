import { Router } from 'express';
import teamsController from '../controllers/teams.controller';

const teamsRouter = Router();

teamsRouter.get('/', teamsController.getAll);
teamsRouter.get('/:id', teamsController.getOne);

export default teamsRouter;
