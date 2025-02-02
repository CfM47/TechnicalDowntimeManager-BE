import { NewResource, Resource } from '../features/Resources/schema';
import { ResourceType } from '../features/Resources/types';
import { ResourceQuery } from '../features/Resources/utils';
import { IRepository } from './IRepository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IResourceModel
  extends IRepository<ResourceQuery, NewResource, Resource, ResourceType> {}
