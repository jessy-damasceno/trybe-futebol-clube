import { IMatch, ITeam, ITeamResults, TeamResult } from '../interfaces';

const INITIAL_TEAM_TABLE = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

abstract class Leaderboard {
  protected teamsResults: ITeamResults = {};
  public table: TeamResult[];

  protected initialize(matches: IMatch[], teams: ITeam[]) {
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

  protected increaseMatch = (teams: number[]): void => {
    for (let i = 0; i < teams.length; i += 1) {
      if (!this.teamsResults[teams[i]]) {
        this.teamsResults[teams[i]] = Object.create(INITIAL_TEAM_TABLE);
      }
      this.teamsResults[teams[i]].totalGames += 1;
    }
  };

  protected increaseGoalsFavor = (team: number, homeTeamGoals: number): void => {
    this.teamsResults[team].goalsFavor += homeTeamGoals;
  };

  protected increaseGoalsOwn = (team: number, awayTeamGoals: number): void => {
    this.teamsResults[team].goalsOwn += awayTeamGoals;
  };

  protected increaseGoals = (
    homeTeam: number,
    homeTeamGoals: number,
    awayTeam: number,
    awayTeamGoals: number,
  ): void => {
    this.increaseGoalsFavor(homeTeam, homeTeamGoals);
    this.increaseGoalsFavor(awayTeam, awayTeamGoals);
    this.increaseGoalsOwn(homeTeam, awayTeamGoals);
    this.increaseGoalsOwn(awayTeam, homeTeamGoals);
  };

  protected increaseWin = (team: number): void => {
    this.teamsResults[team].totalVictories += 1;
  };

  protected increaseLoss = (team: number): void => {
    this.teamsResults[team].totalLosses += 1;
  };

  protected increaseDraw = (teams: number[]): void => {
    for (let i = 0; i < teams.length; i += 1) {
      this.teamsResults[teams[i]].totalDraws += 1;
    }
  };

  protected totalPoints = (wins: number, draws: number): number => (3 * wins) + draws;

  protected efficiency = (points: number, totalMatches: number): number => {
    const possiblePoints = totalMatches * 3;
    const response = ((points / possiblePoints) * 100).toFixed(2);

    return Number(response);
  };

  protected goalsBalance = (gp: number, gc: number): number => gp - gc;

  abstract setResults(match: IMatch): void;

  protected sortTable = (a: TeamResult, b: TeamResult) => {
    let sort = b.totalPoints - a.totalPoints;
    if (!sort) sort = b.totalVictories - a.totalVictories;
    if (!sort) sort = b.goalsBalance - a.goalsBalance;
    if (!sort) sort = b.goalsFavor - a.goalsFavor;
    if (!sort) sort = b.goalsOwn - a.goalsOwn;
    return sort;
  };
}

export default Leaderboard;
