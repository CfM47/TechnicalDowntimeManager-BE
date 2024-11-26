import { IUserModel } from '../Interfaces/IUserModel';
import { NewUser, User } from '../../db/schemas/user';
import { db } from '../../db/config/db_connect';
import { user } from '../../db/schemas/user';
import { eq } from 'drizzle-orm';

export class UserModel implements IUserModel {
  async create(newUser: NewUser): Promise<User> {
    const createdUser = await db.insert(user).values(newUser).returning();
    return createdUser[0];
  }

  async delete(id: string): Promise<void> {
    await db.delete(user).where(eq(user.id, id));
  }

  async getAll(): Promise<User[]> {
    return db.select().from(user);
  }

  async getById(id: string): Promise<User | null> {
    const resultUser = await db.select().from(user).where(eq(user.id, id)).limit(1);
    return resultUser[0];
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const updatedUser = await db.update(user).set(userData).where(eq(user.id, id)).returning();
    return updatedUser[0];
  }
}
