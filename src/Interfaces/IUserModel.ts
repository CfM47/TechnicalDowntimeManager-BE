import { User, NewUser } from '../features/User/schema';
import { UserQuery } from '../features/User/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line
export interface IUserModel extends IRepository<UserQuery, NewUser, User> {}
