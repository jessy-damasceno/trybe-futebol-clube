import * as bcrypt from 'bcryptjs';
import { ILogin, IUser } from '../interfaces';
import User from '../database/models/User';

class UserService {
  public findAll = async (): Promise<IUser[] | []> => await User
    .findAll({ attributes: { exclude: ['password'] } }) || [];

  public login = async ({ email, password }: ILogin): Promise<boolean> => {
    // achar user com email
    const user = await User.findOne({ where: { email } });

    if (!user) { return false; }
    if (!bcrypt.compareSync(password, user.password)) { return false; }

    return true;
  };
}

export default new UserService();
