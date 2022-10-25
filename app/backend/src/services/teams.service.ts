import { ITeam } from '../interfaces';
import Team from '../database/models/Team';

class TeamService {
  public findAll = async (): Promise<ITeam[] | []> => await Team
    .findAll() || [];
}

export default new TeamService();
