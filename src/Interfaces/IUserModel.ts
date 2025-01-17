import { UserQuery } from '../features/User/utils';
import { IRepository } from './IRepository';
import { Role } from '../features/Role/types';

export interface IUserModel extends IRepository<UserQuery> {
  getRoleByUserId(userId: string): Promise<Role | null>;
}
