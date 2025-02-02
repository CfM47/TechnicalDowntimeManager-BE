import { Request, Response } from 'express';
import { validate } from '../../utils';
import { IUserModel } from '../../Interfaces/IUserModel';
import { createToken, signinSchema } from './utils';
import bcrypt from 'bcrypt';
import { UserQuery } from '../User/utils';
import { User } from '../User/schema';

/**
 * Controller for handling authentication-related operations.
 *
 * This controller provides methods for signing in users.
 */
export class AuthController {
  private userModel: IUserModel;
  constructor(userModel: IUserModel) {
    this.userModel = userModel;
  }

  /**
   * Signs in a user.
   *
   * Validates the request body against the signin schema, checks the user's
   * credentials, generates a token, updates the user's token in the database,
   * and returns the token along with the user's name and role.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  signin = async (req: Request, res: Response) => {
    const result = validate(req.body, signinSchema);
    if (!result.success) {
      res.status(400).json({ message: JSON.parse(result.error.message) });
      return;
    }
    const data = result.data;
    const userData = await this.userModel.getByName(data.name);
    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const correctPassword: boolean = await bcrypt.compare(data.password, userData.password);
    if (!correctPassword) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }
    const token = createToken(data.name);
    const query: UserQuery = { name: data.name };
    const updateToken: Partial<User> = { token: token };
    await this.userModel.update(query, updateToken);
    res.status(200).json({
      token: token,
      name: userData.name,
      id_role: userData.id_role
    });
  };
}
