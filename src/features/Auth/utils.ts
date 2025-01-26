import z from 'zod';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const signinSchema = z.object({
  name: z.string(),
  password: z.string()
});

const secret = process.env.SECRET_KEY || 'secret';

/**
 * Creates a JWT token for the given user name.
 *
 * @param name - The name of the user.
 * @returns The generated JWT token.
 */
export function createToken(name: string) {
  return jwt.sign({ name: name }, secret, { expiresIn: '24h' });
}

/**
 * Validates a given JWT token.
 *
 * @param token - The JWT token to validate.
 */
export function isValidToken(token: string) {
  jwt.verify(token, secret, { complete: true });
}
