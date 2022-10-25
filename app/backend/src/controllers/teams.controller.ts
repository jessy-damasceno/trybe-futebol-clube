import { Request, Response } from 'express';
import TeamService from '../services/teams.service';
import statusCodes from '../utils/statusCodes';

class TeamsController {
  constructor(private teamService = TeamService) { }

  public getAll = async (req: Request, res: Response) => {
    const teamsList = await this.teamService.findAll();

    return res.status(statusCodes.ok).json(teamsList);
  };

  public getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.findOne(Number(id));

    return res.status(statusCodes.ok).json(team);
  };
}

export default new TeamsController();
