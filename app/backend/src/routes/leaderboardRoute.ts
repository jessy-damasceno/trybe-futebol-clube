import { Request, Response, Router } from 'express';
import teamsService from '../services/teams.service';
import { Leaderboard } from '../leaderboard';
import matchService from '../services/matches.service';
import statusCodes from '../utils/statusCodes';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (req: Request, res: Response) => {
  const matches = await matchService.findAll('false');
  const teams = await teamsService.findAll();
  const leaderboard = new Leaderboard(matches, teams);

  return res.status(statusCodes.ok).json(leaderboard.table);
});

leaderboardRouter.get('/home');
leaderboardRouter.get('/away');

export default leaderboardRouter;
