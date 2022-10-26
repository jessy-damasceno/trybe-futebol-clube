import { Request, Response, NextFunction } from 'express';
import Team from '../database/models/Team';
import { IMatch } from '../interfaces';
import { validateNewMatch } from '../validations/validations';

export const validateFields = async (req: Request, _res: Response, next: NextFunction) => {
  const error = validateNewMatch(req.body as unknown as IMatch);

  if (error.type) {
    return next(error);
  }
  return next();
};

export const validateTeams = (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return next({
      type: 'typeError',
      message: 'It is not possible to create a match with two equal teams' });
  }

  return next();
};

export const isValidTeams = async (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const teams = await Promise.all([homeTeam, awayTeam].map((id) => Team.findByPk(id)));

  if (teams.some((team) => team === null)) {
    return next({
      type: 'notFound',
      message: 'There is no team with such id!',
    });
  }
  return next();
};

export const lint = () => console.log('bom dia, lint');
