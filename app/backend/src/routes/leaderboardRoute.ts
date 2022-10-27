import { Request, Response, Router } from 'express';
import teamsService from '../services/teams.service';
import matchService from '../services/matches.service';
import statusCodes from '../utils/statusCodes';
import { LeaderboardAll, LeaderboardAway, LeaderboardHome } from '../leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (req: Request, res: Response) => {
  const matches = await matchService.findAll('false');
  const teams = await teamsService.findAll();
  const leaderboard = new LeaderboardAll(matches, teams);

  return res.status(statusCodes.ok).json(leaderboard.table);
});

leaderboardRouter.get('/home', async (req: Request, res: Response) => {
  const matches = await matchService.findAll('false');
  const teams = await teamsService.findAll();
  const leaderboard = new LeaderboardHome(matches, teams);

  return res.status(statusCodes.ok).json(leaderboard.table);
});

leaderboardRouter.get('/away', async (req: Request, res: Response) => {
  const matches = await matchService.findAll('false');
  const teams = await teamsService.findAll();
  const leaderboard = new LeaderboardAway(matches, teams);

  return res.status(statusCodes.ok).json(leaderboard.table);
});

export default leaderboardRouter;
