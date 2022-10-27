import { IMatch, ITeam } from '../interfaces';
import Leaderboard from './Leaderboard';

class LeaderboardHome extends Leaderboard {
  constructor(protected matches: IMatch[], teams: ITeam[]) {
    super();
    this.matches.forEach((match) => this.setResults(match));
    super.initialize(matches, teams);
  }

  setResults = (match: IMatch) => {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;

    this.increaseMatch([homeTeam]);

    this.increaseGoalsFavor(homeTeam, homeTeamGoals);
    this.increaseGoalsOwn(homeTeam, awayTeamGoals);

    if (homeTeamGoals > awayTeamGoals) {
      this.increaseWin(homeTeam);
    } else if (awayTeamGoals > homeTeamGoals) {
      this.increaseLoss(homeTeam);
    } else if (homeTeamGoals === awayTeamGoals) {
      this.increaseDraw([homeTeam]);
    }
  };
}

export default LeaderboardHome;
