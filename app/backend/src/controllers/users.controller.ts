import { Request, Response } from 'express';
import UserService from '../services/users.service';
import statusCodes from '../utils/statusCodes';

class UsersController {
  constructor(private userService = UserService) { }

  public login = async (req: Request, res: Response) => {
    const token = await this.userService.generateToken(req.body);
    return res.status(statusCodes.ok).json({ token });
  };

  public getRole = async (req: Request, res: Response) => {
    const { user } = res.locals;

    return res.status(statusCodes.ok).json({ role: user.role });
  };
}

export default new UsersController();
