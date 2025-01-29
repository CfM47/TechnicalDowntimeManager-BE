import { IUserModel } from '../../Interfaces/IUserModel';
import { NewUser, User, user } from './schema';
import { db } from '../../db/config/db_connect';
import { and, asc, eq } from 'drizzle-orm';
import { UserQuery, UserQueryBuilder } from './utils';
import { department } from '../Department/schema';
import { userSelection, UserType } from './types';
import { countTableRows, PaginatedResponse, Pagination } from '../../utils';

/**
 * Implementation of the IUserModel interface.
 * Provides methods for creating, deleting, retrieving, and updating users in the database.
 */

export class UserModel implements IUserModel {
  /**
   * Creates a new user in the database.
   * @param newUser - The new user data to be inserted.
   * @returns The created user or null if creation failed.
   */
  async create(newUser: NewUser): Promise<UserType | null> {
    const [createdUser] = await db.insert(user).values(newUser).returning();
    const query: UserQuery = {
      id: createdUser.id
    };
    return await this.getById(query);
  }

  /**
   * Deletes a user from the database.
   * @param keys - The query keys to identify the user to be deleted.
   */
  async delete(keys: UserQuery): Promise<void> {
    const filter = UserQueryBuilder(keys);
    await db.delete(user).where(and(...filter));
  }

  /**
   * Retrieves all users from the database based on the provided filter.
   * @param filter - The query filter to apply.
   * @param pagination
   * @returns An array of users matching the filter.
   */
  async getAll(filter: UserQuery, pagination: Pagination): Promise<PaginatedResponse<UserType>> {
    const filterQuery = UserQueryBuilder(filter);
    const items = await db
      .select(userSelection)
      .from(user)
      .innerJoin(department, eq(user.id_department, department.id))
      .where(and(...filterQuery))
      .orderBy(asc(user.name))
      .limit(pagination.size)
      .offset(pagination.size * (pagination.page - 1));
    return {
      items,
      page: pagination.page,
      size: pagination.size,
      total: await countTableRows(user, filterQuery)
    };
  }

  /**
   * Retrieves a user by their ID.
   * @param keys - The query keys to identify the user.
   * @returns The user matching the ID or null if not found.
   */
  async getById(keys: UserQuery): Promise<UserType | null> {
    const filter = UserQueryBuilder(keys);
    const [resultUser] = await db
      .select(userSelection)
      .from(user)
      .innerJoin(department, eq(user.id_department, department.id))
      .where(and(...filter))
      .limit(1);
    return resultUser;
  }

  /**
   * Updates a user in the database.
   * @param keys - The query keys to identify the user to be updated.
   * @param userData - The new data to update the user with.
   * @returns The updated user or null if update failed.
   */
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

  /**
   * Retrieves a user by their name.
   * @param name - The name of the user to retrieve.
   * @returns The user matching the name or null if not found.
   */
  async getByName(name: string): Promise<User | null> {
    const [userData] = await db.select().from(user).where(eq(user.name, name)).limit(1);
    return userData;
  }
}
