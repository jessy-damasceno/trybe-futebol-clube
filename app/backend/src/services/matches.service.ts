import { IMatch } from '../interfaces';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class MatchService {
  public findAll = async (): Promise<IMatch[] | []> => await Match
    .findAll({
      include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' }],
    }) || [];

  public findOne = async (id: number): Promise<IMatch | null> => Match.findByPk(id);
}

export default new MatchService();
