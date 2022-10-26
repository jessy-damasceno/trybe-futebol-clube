import { Request, Response } from 'express';
import MatchService from '../services/matches.service';
import statusCodes from '../utils/statusCodes';

class MatchesController {
  constructor(private matchService = MatchService) { }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matchesList = await this.matchService.findAll(inProgress as string);

    return res.status(statusCodes.ok).json(matchesList);
  };

  public getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.matchService.findOne(Number(id));

    return res.status(statusCodes.ok).json(match);
  };

  public create = async (req: Request, res: Response) => {
    const matchCreated = await this.matchService.create(req.body, true);

    return res.status(statusCodes.created).json(matchCreated);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await this.matchService.finishMatch(Number(id));

    return res.status(statusCodes.ok).json({ message });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;

    const match = await this.matchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(statusCodes.ok).json(match);
  };
}

export default new MatchesController();
