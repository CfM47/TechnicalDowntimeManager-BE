import { User, NewUser } from '../features/User/schema';
import { UserQuery } from '../features/User/utils';

export interface IUserModel {
  create(newUser: NewUser): Promise<User>;

  getAll(): Promise<User[]>;

  getById(keys: UserQuery): Promise<User | null>;

  update(keys: UserQuery, userData: Partial<User>): Promise<User | null>;

  delete(keys: UserQuery): Promise<void>;
}
