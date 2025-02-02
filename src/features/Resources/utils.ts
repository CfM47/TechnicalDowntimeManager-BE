import { eq, SQL } from 'drizzle-orm';
import { z } from 'zod';
import { resource } from './schema';

export const resourceSchema = z.object({
  name: z.string()
});

export type ResourceQuery = {
  id?: string;
  name?: string;
};

export function ResourceQueryBuilder(query: ResourceQuery): SQL[] {
  const filters: SQL[] = [];
  if (query.id) filters.push(eq(resource.id, query.id));
  if (query.name) filters.push(eq(resource.name, query.name));
  return filters;
}
