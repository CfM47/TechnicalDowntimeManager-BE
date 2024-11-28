import z from 'zod';

export const rateSchema = z.object({
  id_technician : z.string().uuid(),
  id_user: z.string().uuid(),
  comment : z.string(),
  score : z.number()
})
