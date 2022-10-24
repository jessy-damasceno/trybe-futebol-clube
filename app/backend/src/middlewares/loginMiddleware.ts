import { Request, Response, NextFunction } from 'express';
import userService from '../services/users.service';
import { validateLogin } from '../validations/validations';

export const fields = async (req: Request, _res: Response, next: NextFunction) => {
  const error = validateLogin(req.body);

  if (error.type) {
    return next(error);
  }
  return next();
};

export const login = async (req: Request, _res: Response, next: NextFunction) => {
  const isValid = await userService.login(req.body);

  return isValid ? next() : next({
    type: 'unauthorizedUser',
    message: 'Incorrect email or password',
  });
};
