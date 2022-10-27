import { IMatch, ITeam } from '../interfaces';
import Leaderboard from './Leaderboard';

class LeaderboardAll extends Leaderboard {
  constructor(protected matches: IMatch[], teams: ITeam[]) {
    super();
    this.matches.forEach((match) => this.setResults(match));
    super.initialize(matches, teams);
  }

  setResults = (match: IMatch): void => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = match;

    this.increaseMatch([homeTeam, awayTeam]);

    this.increaseGoals(homeTeam, homeTeamGoals, awayTeam, awayTeamGoals);

    if (homeTeamGoals > awayTeamGoals) {
      this.increaseWin(homeTeam);
      this.increaseLoss(awayTeam);
    } else if (awayTeamGoals > homeTeamGoals) {
      this.increaseWin(awayTeam);
      this.increaseLoss(homeTeam);
    } else if (homeTeamGoals === awayTeamGoals) {
      this.increaseDraw([homeTeam, awayTeam]);
    }
  };
}

export default LeaderboardAll;
