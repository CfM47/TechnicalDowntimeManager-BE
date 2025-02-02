import { Role, NewRole } from '../features/Role/schema';
import { RoleQuery } from '../features/Role/utils';
import { IRepository } from './IRepository';
import { RoleType } from '../features/Role/types';

// eslint-disable-next-line
export interface IRoleModel extends IRepository<RoleQuery, NewRole, Role, RoleType> {}
