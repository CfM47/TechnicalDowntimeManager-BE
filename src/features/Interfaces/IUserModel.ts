import { User, NewUser } from '../../db/schemas/user';
import { SQL } from 'drizzle-orm';

export interface IUserModel {
  create(newUser: NewUser): Promise<User>;

  getAll(): Promise<User[]>;

  getById(keys: SQL[]): Promise<User | null>;

  update(keys: SQL[], userData: Partial<User>): Promise<User | null>;

  delete(keys: SQL[]): Promise<void>;
}
