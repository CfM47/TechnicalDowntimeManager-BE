import { User, NewUser } from '../../db/schemas/user';

export interface IUserModel {
  create(newUser: NewUser): Promise<User>;

  getAll(): Promise<User[]>;

  getById(id: string): Promise<User | null>;

  update(id: string, userData: Partial<User>): Promise<User | null>;

  delete(id: string): Promise<void>;
}
