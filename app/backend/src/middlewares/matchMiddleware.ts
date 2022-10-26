import { Request, Response, NextFunction } from 'express';
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

export const lint = () => console.log('bom dia, lint');
