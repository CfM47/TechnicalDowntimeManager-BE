import { Request, RequestHandler, Response } from 'express';
import { validate } from '../../utils';
import { IUserModel } from '../../Interfaces/IUserModel';
import { createToken, decodeToken, signinSchema } from './utils';
import bcrypt from 'bcrypt';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { Role } from '../../enums';

/**
 * Controller for handling authentication-related operations.
 *
 * This controller provides methods for signing in users.
 */
export class AuthController {
  private userModel: IUserModel;
  private roleModel: IRoleModel;
  constructor(userModel: IUserModel, roleModel: IRoleModel) {
    this.userModel = userModel;
    this.roleModel = roleModel;
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
    const referer = req.get('Referer');
    console.log('Request made from:', referer);

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

    const roleData = await this.roleModel.getById({ id: userData.id_role });

    const token = createToken(data.name, roleData?.name || Role.user);

    res.status(200).json({
      token: token,
      name: userData.name,
      id_role: userData.id_role
    });
  };

  hasRole = ({ allowedRoles }: { allowedRoles: Role[] }): RequestHandler => {
    return async (req, res, next) => {
      const getRoles = allowedRoles.map((role) => this.roleModel.getById({ name: role }));
      const roles = await Promise.all(getRoles);
      if (roles.some((role) => role === undefined)) {
        res.status(404).json({ message: 'One or more roles does not exist' });
        return;
      }

      const { token } = req.body;
      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const decoded = decodeToken(token);
      const { name, role } = decoded;

      if (!name || !role) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const user = await this.userModel.getByName(name);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (!roles.map((r) => r?.id).includes(user.id_role)) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      next();
    };
  };
}
