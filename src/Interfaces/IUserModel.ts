import { UserQuery } from '../features/User/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserModel extends IRepository<UserQuery> {}
