import z from 'zod';

export const userSchema = z.object({
  name: z.string(),
  password: z.string(),
  id_department: z.string().uuid(),
  id_role: z.number().int().positive()
});

export function validateUser(object: any) {
  return userSchema.safeParse(object);
}

export function validateUserUpdate(object: any) {
  return userSchema.partial().safeParse(object);
}
