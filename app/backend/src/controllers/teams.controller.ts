import { Request, Response } from 'express';
import TeamService from '../services/teams.service';
import statusCodes from '../utils/statusCodes';

class TeamsController {
  constructor(private teamService = TeamService) { }

  public getAll = async (req: Request, res: Response) => {
    const teamsList = await this.teamService.findAll();

    return res.status(statusCodes.ok).json(teamsList);
  };
}

export default new TeamsController();
