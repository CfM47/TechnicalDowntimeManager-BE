import { resource } from './schema';

export interface ResourceType {
  id: string;
  name: string;
}

export const resourceSelection = {
  id: resource.id,
  name: resource.name
};
