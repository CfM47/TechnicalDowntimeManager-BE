import { IUserModel } from '../../Interfaces/IUserModel';
import { Request, Response } from 'express';
import { UserQuery, userSchema } from './utils';
import { NewUser, User } from './schema';
import * as crypto from 'node:crypto';
import { ErrorMessage, validate, validatePagination, validateUpdate } from '../../utils';
import bcrypt from 'bcrypt';

/**
 * Controller class for handling User-related operations.
 * This class provides methods for creating, retrieving, updating, and deleting users.
 */
export class UserController {
  userModel: IUserModel;

  /**
   * Constructor for UserController.
   * @param userModel - The user model to interact with the database.
   */
  constructor(userModel: IUserModel) {
    this.userModel = userModel;
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
      const userData: NewUser = {
        id: crypto.randomUUID(),
        ...result.data
      };
      //TODO Verify if user department and user role exist before insert
      userData.password = await bcrypt.hash(userData.password, 10);
      const newUser = await this.userModel.create(userData);
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
      const userData: Partial<User> = { ...result.data };
      const userFound = await this.userModel.getById(userQuery);
      if (!userFound) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      //TODO Verify if user department and user role exist before update
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
