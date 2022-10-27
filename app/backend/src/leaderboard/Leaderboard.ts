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

class Leaderboard {
  private teamsResults: ITeamResults = {};
  public table: TeamResult[];

  constructor(private matches: IMatch[], teams: ITeam[]) {
    this.matches.forEach((match) => this.setResults(match));

    Object.keys(this.teamsResults).forEach((team) => {
      const { totalVictories, totalDraws,
        goalsFavor, goalsOwn, totalGames } = this.teamsResults[team as never];

      const teamPoints = this.totalPoints(totalVictories, totalDraws);

      this.teamsResults[team as never].totalPoints = teamPoints;
      this.teamsResults[team as never].goalsBalance = this.goalsBalance(goalsFavor, goalsOwn);
      this.teamsResults[team as never].efficiency = this.efficiency(teamPoints, totalGames);
    });

    this.table = teams.map((team) => {
      this.teamsResults[team.id as number].name = team.teamName;

      return this.teamsResults[team.id as number];
    });
  }

  private increaseMatch = (teams: number[]): void => {
    for (let i = 0; i < teams.length; i += 1) {
      if (!this.teamsResults[teams[i]]) {
        this.teamsResults[teams[i]] = Object.create(INITIAL_TEAM_TABLE);
      }
      this.teamsResults[teams[i]].totalGames += 1;
    }
  };

  private increaseGoalsFavor = (team: number, homeTeamGoals: number): void => {
    this.teamsResults[team].goalsFavor += homeTeamGoals;
  };

  private increaseGoalsOwn = (team: number, awayTeamGoals: number): void => {
    this.teamsResults[team].goalsOwn += awayTeamGoals;
  };

  private increaseGoals = (
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

  private increaseWin = (team: number): void => {
    this.teamsResults[team].totalVictories += 1;
  };

  private increaseLoss = (team: number): void => {
    this.teamsResults[team].totalLosses += 1;
  };

  private increaseDraw = (teams: number[]): void => {
    for (let i = 0; i < teams.length; i += 1) {
      this.teamsResults[teams[i]].totalDraws += 1;
    }
  };

  private totalPoints = (wins: number, draws: number): number => (3 * wins) + draws;

  private efficiency = (points: number, totalMatches: number): number => {
    const possiblePoints = totalMatches * 3;

    return (points / possiblePoints) * 100;
  };

  private goalsBalance = (gp: number, gc: number): number => gp - gc;

  private setResults = (match: IMatch): void => {
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

export default Leaderboard;
