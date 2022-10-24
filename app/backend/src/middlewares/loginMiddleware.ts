import { Request, Response, NextFunction } from 'express';
import { validateLogin } from '../validations/validations';

export const fields = async (req: Request, res: Response, next: NextFunction) => {
  const error = validateLogin(req.body);

  if (error.type) {
    next(error);
  }
  next();
};

export const login = () => console.log('Not implemented yet');
