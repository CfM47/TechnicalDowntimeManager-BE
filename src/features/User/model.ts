import { IUserModel } from '../../Interfaces/IUserModel';
import { NewUser, User, user } from './schema';
import { db } from '../../db/config/db_connect';
import { and } from 'drizzle-orm';
import { UserQuery, UserQueryBuilder } from './utils';

export class UserModel implements IUserModel {
  async create(newUser: NewUser): Promise<User> {
    const createdUser = await db.insert(user).values(newUser).returning();
    return createdUser[0];
  }

  async delete(keys: UserQuery): Promise<void> {
    const filter = UserQueryBuilder(keys);
    await db.delete(user).where(and(...filter));
  }

  async getAll(): Promise<User[]> {
    return db.select().from(user);
  }

  async getById(keys: UserQuery): Promise<User | null> {
    const filter = UserQueryBuilder(keys);
    const resultUser = await db
      .select()
      .from(user)
      .where(and(...filter))
      .limit(1);
    return resultUser[0];
  }

  async update(keys: UserQuery, userData: Partial<User>): Promise<User | null> {
    const filter = UserQueryBuilder(keys);
    const updatedUser = await db
      .update(user)
      .set(userData)
      .where(and(...filter))
      .returning();
    return updatedUser[0];
  }
}
