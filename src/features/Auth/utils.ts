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
 * Creates a JWT token for the given user name and role.
 *
 * @param name - The name of the user.
 * @returns The generated JWT token.
 */
export function createToken(name: string, role: string) {
  return jwt.sign({ name, role }, secret, { expiresIn: '1h' });
}

/**
 * Validates a given JWT token.
 *
 * @param token - The JWT token to validate.
 */
export function isValidToken(token: string) {
  jwt.verify(token, secret, { complete: true });
}

/**
 * Extracts the user name and role from a JWT token.
 *
 * @param token - The JWT token.
 * @returns The user name and role extracted from the token.
 */
export function decodeToken(token: string) {
  const decoded = jwt.decode(token) as { name: string; role: string };
  return decoded;
}
