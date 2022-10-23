import { NextFunction, Request, Response } from 'express';
import IError from '../interfaces/@error';
import { mapError } from '../utils/mapError';

const errorMiddleware = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  const { type, message } = err;
  return res.status(mapError(type)).json({ message });
};

export default errorMiddleware;
