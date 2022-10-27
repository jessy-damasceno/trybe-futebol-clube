import { IMatch, ITeam } from '../interfaces';
import Leaderboard from './Leaderboard';

class LeaderboardAway extends Leaderboard {
  constructor(protected matches: IMatch[], teams: ITeam[]) {
    super();
    this.matches.forEach((match) => this.setResults(match));

    Object.keys(this.teamsResults).forEach((team) => {
      const { totalVictories, totalDraws,
        goalsFavor, goalsOwn, totalGames, totalLosses } = this.teamsResults[team as never];

      const teamPoints = this.totalPoints(totalVictories, totalDraws);

      this.teamsResults[team as never].totalPoints = teamPoints;
      this.teamsResults[team as never].totalLosses = totalLosses;
      this.teamsResults[team as never].totalDraws = totalDraws;
      this.teamsResults[team as never].totalVictories = totalVictories;
      this.teamsResults[team as never].goalsBalance = this.goalsBalance(goalsFavor, goalsOwn);
      this.teamsResults[team as never].efficiency = this.efficiency(teamPoints, totalGames);
    });

    this.table = teams.map((team) => {
      this.teamsResults[team.id as number].name = team.teamName;

      return this.teamsResults[team.id as number];
    }).sort(this.sortTable);
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
