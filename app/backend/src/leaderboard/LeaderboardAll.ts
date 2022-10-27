import { IMatch, ITeam } from '../interfaces';
import Leaderboard from './Leaderboard';

class LeaderboardAll extends Leaderboard {
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
