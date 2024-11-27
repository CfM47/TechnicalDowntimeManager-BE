import z from 'zod';

export const equipmentSchema = z.object({
  name: z.string().max(255),
  type: z.string().max(255),
  state: z.string().max(255),
  id_department: z.string().uuid(),
});
