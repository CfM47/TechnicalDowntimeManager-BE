import { User, NewUser } from '../features/User/schema';
import { UserQuery } from '../features/User/utils';
import { IRepository } from './IRepository';
import { UserType } from '../features/User/types';

export interface IUserModel extends IRepository<UserQuery, NewUser, User, UserType> {
  getByName(name: string): Promise<User | null>;
}
