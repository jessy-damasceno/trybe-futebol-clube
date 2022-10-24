import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { ILogin, IUser } from '../interfaces';
import User from '../database/models/User';

class UserService {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'my_secret';
  }

  public findAll = async (): Promise<IUser[] | []> => await User
    .findAll({ attributes: { exclude: ['password'] } }) || [];

  public isUser = async ({ email, password }: ILogin): Promise<boolean> => {
    const user = await User.findOne({ where: { email } });

    if (!user) { return false; }
    if (!bcrypt.compareSync(password, user.password)) { return false; }

    return true;
  };

  readonly generateToken = (user: IUser): string => {
    const token = jwt.sign(user, this.secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  };
}

export default new UserService();
