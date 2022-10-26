import { IMatch } from '../interfaces';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class MatchService {
  public findAll = async (inProgress: string | undefined): Promise<IMatch[] | []> => {
    const matchesList = await Match
      .findAll({
        include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' }],
      });

    if (inProgress !== undefined && (inProgress === 'true' || inProgress === 'false')) {
      return matchesList.filter((e) => e.inProgress === this.stringToBool(inProgress));
    }

    return matchesList;
  };

  public findOne = async (id: number): Promise<IMatch | null> => Match.findByPk(id);

  private stringToBool = (string: string): boolean => string === 'true';

  public create = (payload: IMatch, inProgress: boolean): Promise<IMatch> => {
    const matchCreated = Match.create({ ...payload, inProgress });

    return matchCreated;
  };

  public finishMatch = async (id: number): Promise<string> => {
    await Match.update({ inProgress: true }, {
      where: {
        id,
      },
    });
    return 'Finished';
  };

  public updateMatch = async (id: number, g1: number, g2: number) => {
    const updatedMatch = await Match.update({ homeTeamGoals: g1, awayTeamGoals: g2 }, {
      where: {
        id,
      },
    });
    return updatedMatch;
  };
}

export default new MatchService();
