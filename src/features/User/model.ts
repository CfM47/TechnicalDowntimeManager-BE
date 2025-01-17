import { IUserModel } from '../../Interfaces/IUserModel';
import { user } from './schema';
import { UserQuery, UserQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';

export class UserModel extends IRepository<UserQuery> implements IUserModel {
  constructor() {
    super(user, UserQueryBuilder);
  }
}
