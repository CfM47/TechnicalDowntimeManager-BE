import z from 'zod';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const signinSchema = z.object({
  name: z.string(),
  password: z.string()
});

const secret = process.env.SECRET_KEY || 'secret';

export function createToken(name: string) {
  return jwt.sign({ name: name }, secret, { expiresIn: '24h' });
}

export function isValidToken(token: string) {
  jwt.verify(token, secret, { complete: true });
}
