import z from 'zod';

export const technicianSchema = z.object({
  id_user: z.string().uuid(),
  exp_years: z.number().int().positive(),
  specialty: z.string()
});
