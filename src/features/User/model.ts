import { IUserModel } from '../../Interfaces/IUserModel';
import { user } from './schema';
import { UserQuery, UserQueryBuilder } from './utils';
import { IRepository } from '../../Interfaces/IRepository';
import { Role } from '../Role/types';
import { db } from '../../db/config/db_connect';
import { role } from '../Role/schema';
import { eq } from 'drizzle-orm';

export class UserModel extends IRepository<UserQuery> implements IUserModel {
  constructor() {
    super(user, UserQueryBuilder);
  }

  async getRoleByUserId(userId: string): Promise<Role | null> {
    const result = await db
      .select({
        id: role.id,
        name: role.name
      })
      .from(role)
      .innerJoin(user, eq(user.id_role, role.id))
      .where(eq(user.id, userId))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }
}
