import { ILogin } from '../interfaces';
import * as schemas from './schemas';

export const validateLogin = (payload: ILogin) => {
  const { error } = schemas.loginSchema.validate(payload);

  if (error) {
    return {
      type: 'INVALID_FIELD',
      message: error.details[0].message,
    };
  }
  return { type: null };
};

export const lint = () => console.log('xisdê');
