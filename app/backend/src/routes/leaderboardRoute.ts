import { Router } from 'express';

const leaderboardRouter = Router();

leaderboardRouter.route('/home');
leaderboardRouter.route('/away');

export default leaderboardRouter;
