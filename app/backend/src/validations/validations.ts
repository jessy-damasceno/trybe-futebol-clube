import { ILogin, IMatch } from '../interfaces';
import * as schemas from './schemas';

export const validateLogin = (payload: ILogin) => {
  const { error } = schemas.loginSchema.validate(payload);

  if (error) {
    return {
      type: 'invalidField',
      message: 'All fields must be filled',
    };
  }
  return { type: null };
};

export const validateNewMatch = (payload: IMatch | null) => {
  const { error } = schemas.addNewMatchSchema.validate(payload);

  if (error) {
    return {
      type: 'invalidField',
      message: 'All fields must be filled',
    };
  }
  return { type: null };
};

export const lint = () => console.log('xisdê');
