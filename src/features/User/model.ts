import { IUserModel } from '../../Interfaces/IUserModel';
import { NewUser, User, user } from './schema';
import { db } from '../../db/config/db_connect';
import { and, eq } from 'drizzle-orm';
import { UserQuery, UserQueryBuilder } from './utils';
import { department } from '../Department/schema';
import { role } from '../Role/schema';
import { userSelection, UserType } from './types';

export class UserModel implements IUserModel {
  async create(newUser: NewUser): Promise<UserType | null> {
    const [createdUser] = await db.insert(user).values(newUser).returning();
    const query: UserQuery = {
      id: createdUser.id
    };
    return await this.getById(query);
  }

  async delete(keys: UserQuery): Promise<void> {
    const filter = UserQueryBuilder(keys);
    await db.delete(user).where(and(...filter));
  }

  async getAll(filter: UserQuery): Promise<UserType[]> {
    return db
      .select(userSelection)
      .from(user)
      .innerJoin(department, eq(user.id_department, department.id))
      .innerJoin(role, eq(user.id_role, role.id))
      .where(and(...UserQueryBuilder(filter)));
  }

  async getById(keys: UserQuery): Promise<UserType | null> {
    const filter = UserQueryBuilder(keys);
    const [resultUser] = await db
      .select(userSelection)
      .from(user)
      .innerJoin(department, eq(user.id_department, department.id))
      .innerJoin(role, eq(user.id_role, role.id))
      .where(and(...filter))
      .limit(1);
    return resultUser;
  }

  async update(keys: UserQuery, userData: Partial<User>): Promise<UserType | null> {
    const filter = UserQueryBuilder(keys);
    const [updatedUser] = await db
      .update(user)
      .set(userData)
      .where(and(...filter))
      .returning();
    const query: UserQuery = {
      id: updatedUser.id
    };
    return await this.getById(query);
  }

  async getByName(name: string): Promise<User | null> {
    const [userData] = await db.select().from(user).where(eq(user.name, name)).limit(1);
    return userData;
  }
}
