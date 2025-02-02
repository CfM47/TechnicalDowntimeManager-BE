import { NewRoleResource } from '../features/Role-Resource/schema';
import { RoleResourceType } from '../features/Role-Resource/types';
import { RoleResourceQuery } from '../features/Role-Resource/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRoleResourceModel
  extends IRepository<RoleResourceQuery, NewRoleResource, NewRoleResource, RoleResourceType> {}
