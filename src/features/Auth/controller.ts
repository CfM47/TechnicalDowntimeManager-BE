import { Request, RequestHandler, Response } from 'express';
import { getPathName, routesToResource, validate } from '../../utils';
import { IUserModel } from '../../Interfaces/IUserModel';
import { createToken, decodeToken, signinSchema } from './utils';
import bcrypt from 'bcrypt';
import { IRoleModel } from '../../Interfaces/IRoleModel';
import { Role } from '../../enums';
import { IRoleResourceModel } from '../../Interfaces/IRoleResourceModel';
import { IResourceModel } from '../../Interfaces/IResourceModel';

/**
 * Controller for handling authentication-related operations.
 *
 * This controller provides methods for signing in users.
 */
export class AuthController {
  private userModel: IUserModel;
  private roleModel: IRoleModel;
  private resourceModel: IResourceModel;
  private roleResourceModel: IRoleResourceModel;
  constructor(
    userModel: IUserModel,
    roleModel: IRoleModel,
    resourceModel: IResourceModel,
    roleResourceModel: IRoleResourceModel
  ) {
    this.userModel = userModel;
    this.roleModel = roleModel;
    this.resourceModel = resourceModel;
    this.roleResourceModel = roleResourceModel;
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

    const roleData = await this.roleModel.getById({ id: userData.id_role });

    const token = createToken(data.name, roleData?.name || Role.user);

    res.status(200).json({
      token: token,
      name: userData.name
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

      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const token = authHeader.split(' ')[1];
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

  authorize = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const referer = req.headers.referer;

    if (!referer) {
      res.status(200).json({ message: 'Authorized' });
      return;
    }

    const decoded = decodeToken(token);
    const { name, role } = decoded;

    if (!name || !role) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const pathname = getPathName(referer);
    const resourceName = routesToResource[pathname];

    if (!resourceName) {
      res.status(404).json({ message: 'Resource not found' });
      return;
    }

    const resource = await this.resourceModel.getById({ name: resourceName });
    if (!resource) {
      res.status(404).json({ message: 'Resource not found' });
      return;
    }
    const roleEntrie = await this.roleModel.getById({ name: role });
    if (!roleEntrie) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }

    const roleResource = await this.roleResourceModel.getById({
      role_id: roleEntrie.id,
      resource_id: resource.id
    });
    if (!roleResource) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    res.status(200).json({ message: 'Authorized' });
  };
}
