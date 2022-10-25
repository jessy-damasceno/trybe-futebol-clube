import { ITeam } from '../interfaces';
import Team from '../database/models/Team';

class TeamService {
  public findAll = async (): Promise<ITeam[] | []> => await Team
    .findAll() || [];

  public findOne = async (id: number): Promise<ITeam | null> => Team.findByPk(id);
}

export default new TeamService();
