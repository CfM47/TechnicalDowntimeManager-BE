import { role } from './schema';

export interface RoleType {
  id: number;
  name: string;
}

export const roleSelection = {
  id: role.id,
  name: role.name
};
