import { IUserModel } from '../Interfaces/IUserModel';
import { Request, Response } from 'express';
import { userSchema } from './utils';
import { NewUser, User } from '../../db/schemas/user';
import * as crypto from 'node:crypto';
import { ErrorMessage, validate, validateUpdate } from '../../utils';
import bcrypt from 'bcrypt';

export class UserController {
  userModel: IUserModel;
  constructor(userModel: IUserModel) {
    this.userModel = userModel;
  }
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

  getAll = async (req: Request, res: Response) => {
    try {
      const allUsers = await this.userModel.getAll();
      res.status(200).json(allUsers);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await this.userModel.getById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = validateUpdate(req.body, userSchema);
      if (!result.success) {
        res.status(400).json({ message: JSON.parse(result.error.message) });
        return;
      }
      const userData: Partial<User> = { ...result.data };
      const user = await this.userModel.getById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      //TODO Verify if user department and user role exist before update
      const updatedUser = await this.userModel.update(id, userData);
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await this.userModel.getById(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      await this.userModel.delete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
      res.status(500).json(ErrorMessage(e));
    }
  };
}
