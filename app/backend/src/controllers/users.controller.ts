import { Request, Response } from 'express';
import UserService from '../services/users.service';
import statusCodes from '../utils/statusCodes';

class UsersController {
  constructor(private userService = UserService) { }

  // public create = async (req: Request, res: Response) => {
  //   const payload = req.body;

  //   const token = await this.userService.create(payload);
  //   return res.status(statusCodes.created).json({ token });
  // };

  public login = async (req: Request, res: Response) => {
    const token = await this.userService.generateToken(req.body);
    return res.status(statusCodes.ok).json({ token });
  };
}

export default new UsersController();
