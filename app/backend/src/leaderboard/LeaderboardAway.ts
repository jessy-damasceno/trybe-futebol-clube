import { IMatch, ITeam } from '../interfaces';
import Leaderboard from './Leaderboard';

class LeaderboardAway extends Leaderboard {
  constructor(protected matches: IMatch[], teams: ITeam[]) {
    super();
    this.matches.forEach((match) => this.setResults(match));
    super.initialize(matches, teams);
  }

  setResults = (match: IMatch) => {
    const { homeTeamGoals, awayTeam, awayTeamGoals } = match;

    this.increaseMatch([awayTeam]);

    this.increaseGoalsFavor(awayTeam, awayTeamGoals);
    this.increaseGoalsOwn(awayTeam, homeTeamGoals);

    if (homeTeamGoals > awayTeamGoals) {
      this.increaseLoss(awayTeam);
    } else if (awayTeamGoals > homeTeamGoals) {
      this.increaseWin(awayTeam);
    } else if (homeTeamGoals === awayTeamGoals) {
      this.increaseDraw([awayTeam]);
    }
  };
}

export default LeaderboardAway;
