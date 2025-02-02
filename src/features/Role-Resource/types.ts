import { resource } from '../Resources/schema';
import { role } from '../Role/schema';

export interface RoleResourceType {
  role: {
    id: number;
    name: string;
  };
  resource: {
    id: string;
    name: string;
  };
}

export const RoleResourceOrderBy = {
  role_id: 'role_id',
  resource_id: 'resource_id'
};

export const roleResourceSelection = {
  role: {
    id: role.id,
    name: role.name
  },
  resource: {
    id: resource.id,
    name: resource.name
  }
};
