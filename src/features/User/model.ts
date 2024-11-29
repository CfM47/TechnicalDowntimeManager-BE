import { IUserModel } from '../Interfaces/IUserModel';
import { NewUser, User } from '../../db/schemas/user';
import { db } from '../../db/config/db_connect';
import { user } from '../../db/schemas/user';
import { and, eq, SQL } from 'drizzle-orm';

export class UserModel implements IUserModel {
  async create(newUser: NewUser): Promise<User> {
    const createdUser = await db.insert(user).values(newUser).returning();
    return createdUser[0];
  }

  async delete(keys: SQL[]): Promise<void> {
    await db.delete(user).where(and(...keys));
  }

  async getAll(): Promise<User[]> {
    return db.select().from(user);
  }

  async getById(keys: SQL[]): Promise<User | null> {
    const resultUser = await db.select().from(user).where(and(...keys)).limit(1);
    return resultUser[0];
  }

  async update(keys: SQL[], userData: Partial<User>): Promise<User | null> {
    const updatedUser = await db.update(user).set(userData).where(and(...keys)).returning();
    return updatedUser[0];
  }
}
