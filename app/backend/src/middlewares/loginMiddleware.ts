import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import userService from '../services/users.service';
import { validateLogin } from '../validations/validations';
import { IUser } from '../interfaces';
import User from '../database/models/User';

const secret = process.env.JWT_SECRET;

export const fields = async (req: Request, _res: Response, next: NextFunction) => {
  const error = validateLogin(req.body);

  if (error.type) {
    return next(error);
  }
  return next();
};

export const login = async (req: Request, _res: Response, next: NextFunction) => {
  const isUser = await userService.isUser(req.body);

  return isUser ? next() : next({
    type: 'unauthorizedUser',
    message: 'Incorrect email or password',
  });
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization') as string;

  try {
    const { email } = jwt.verify(token, secret as string) as IUser;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      next({ type: 'tokenError', message: 'Token must be a valid token' });
    }

    res.locals.user = user; // User info between middlewares
    next();
  } catch (err) {
    next({ type: 'tokenError', message: 'Token must be a valid token' });
  }
};
