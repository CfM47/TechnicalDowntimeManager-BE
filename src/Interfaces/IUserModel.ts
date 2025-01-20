import { User, NewUser } from '../features/User/schema';
import { UserQuery } from '../features/User/utils';
import { IRepository } from './IRepository';
import { UserType } from '../features/User/types';

// eslint-disable-next-line
export interface IUserModel extends IRepository<UserQuery, NewUser, User, UserType> {}
