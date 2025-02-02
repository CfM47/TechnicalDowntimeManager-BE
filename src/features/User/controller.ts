import { IUserModel } from '../../Interfaces/IUserModel';
import { Request, Response } from 'express';
import { UserQuery, userSchema } from './utils';
import { NewUser, User } from './schema';
import { ErrorMessage, validate, validatePagination, validateUpdate } from '../../utils';
import bcrypt from 'bcrypt';
import { ITechnicianModel } from '../../Interfaces/ITechnicianModel';
import { NewTechnician } from '../Technician/schema';
import { IDepartmentModel } from '../../Interfaces/IDepartmentModel';
import { DepartmentQuery } from '../Department/utils';
import { Role } from '../../enums';
import { IRoleModel } from '../../Interfaces/IRoleModel';

/**
 * Controller class for handling User-related operations.
 * This class provides methods for creating, retrieving, updating, and deleting users.
 */
export class UserController {
  userModel: IUserModel;
  technicianModel: ITechnicianModel;
  departmentModel: IDepartmentModel;
  roleModel: IRoleModel;
  /**
   * Constructor for UserController.
   * @param userModel - The user model to interact with the database.
   * @param technicianModel - The technician model to interact with the database.
   * @param departmentModel - The department model to interact with the database.
   * @param roleModel - The role model to interact with the database.
   */
  constructor(
    userModel: IUserModel,
    technicianModel: ITechnicianModel,
    departmentModel: IDepartmentModel,
    roleModel: IRoleModel
  ) {
    this.userModel = userModel;
    this.technicianModel = technicianModel;
    this.departmentModel = departmentModel;
    this.roleModel = roleModel;
  }

  /**
   * Creates a new user.
   * @param req - The request object.
   * @param res - The response object.
   */
  create = async (req: Request, res: Response) => {
    try {
      const result = validate(req.body, userSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }

      const data = result.data;

      const department = await this.departmentModel.getById({
        id: data.id_department
      } as DepartmentQuery);
      if (!department) {
        res.status(400).json({ message: 'Department not found' });
        return;
      }

      if (data.isTechnician && (!data.exp_years || !data.specialty)) {
        res.status(400).json({ message: 'Missing technician data' });
        return;
      }

      const userPassword = await bcrypt.hash(data.password, 10);

      const technicianRole = await this.roleModel.getById({ name: Role.technician });

      const userData: NewUser = {
        name: result.data.name,
        password: userPassword,
        id_department: data.id_department,
        id_role: data.isTechnician && technicianRole ? technicianRole.id : data.id_role
      };

      const newUser = await this.userModel.create(userData);

      if (data.isTechnician && newUser) {
        const technicianData: NewTechnician = {
          id_user: newUser.id,
          exp_years: data.exp_years as number,
          specialty: data.specialty as string
        };
        await this.technicianModel.create(technicianData);
      }

      res.status(201).json(newUser);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves all users.
   * @param req - The request object.
   * @param res - The response object.
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { page, size, ...query } = req.query;
      const filter: UserQuery = query;
      const pagination = validatePagination(page, size);
      const allUsers = await this.userModel.getAll(filter, pagination);
      res.status(200).json(allUsers);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Retrieves a user by ID.
   * @param req - The request object.
   * @param res - The response object.
   */
  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userQuery: UserQuery = { id: id };

      const userFound = await this.userModel.getById(userQuery);
      if (!userFound) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(userFound);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Updates a user by ID.
   * @param req - The request object.
   * @param res - The response object.
   */
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = validateUpdate(req.body, userSchema);
      const userQuery: UserQuery = { id: id };

      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const data = result.data;

      const userFound = await this.userModel.getById(userQuery);
      if (!userFound) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      if (data.id_department) {
        const department = await this.departmentModel.getById({
          id: data.id_department
        } as DepartmentQuery);
        if (!department) {
          res.status(400).json({ message: 'Department not found' });
          return;
        }
      }

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      const userData: Partial<User> = { ...data };

      const updatedUser = await this.userModel.update(userQuery, userData);
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  /**
   * Deletes a user by ID.
   * @param req - The request object.
   * @param res - The response object.
   */
  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userQuery: UserQuery = { id: id };
      const userFound = await this.userModel.getById(userQuery);
      if (!userFound) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      await this.userModel.delete(userQuery);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
