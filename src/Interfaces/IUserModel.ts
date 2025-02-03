import { User, NewUser } from '../features/User/schema';
import { UserQuery } from '../features/User/utils';
import { IRepository } from './IRepository';
import { UserType } from '../features/User/types';

/**
 * Defines the IUserModel interface which extends the IRepository interface
 * to support operations involving User entities.
 *
 * This interface includes methods for standard repository operations
 * as well as custom functionality specific to User data.
 *
 * @extends IRepository
 *
 * @template UserQuery The type representing the query structure for fetching Users.
 * @template NewUser The type representing the structure of new User objects.
 * @template User The type representing an existing User entity.
 * @template UserType The type associated with the categorization of Users.
 */
export interface IUserModel extends IRepository<UserQuery, NewUser, User, UserType> {
  getByName(name: string): Promise<User | null>;
}
