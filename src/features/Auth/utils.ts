import z from 'zod';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

/**
 * Represents the schema definition for the signin data validation.
 *
 * This schema ensures that the user provides valid data when signing in.
 * It validates input fields such as `name` and `password` to conform to the required types.
 *
 * This object uses a validation library to enforce the following rules:
 * - `name`: Must be a string.
 * - `password`: Must be a string.
 */
export const signinSchema = z.object({
  name: z.string(),
  password: z.string()
});

/**
 * A variable that holds the secret key used for authentication or encryption purposes.
 * It retrieves the value from the environment variable `SECRET_KEY`. If the
 * environment variable is not set, it defaults to the string 'secret'.
 *
 * This variable is intended to be used where a secret key is required, such as
 * signing tokens, encrypting data, or other security-related operations.
 *
 * Ensure that the `SECRET_KEY` environment variable is securely configured in
 * production environments to maintain application security.
 *
 * Default value: 'secret'
 */
const secret = process.env.SECRET_KEY || 'secret';

/**
 * Generates a JSON Web Token (JWT) for the given user name.
 *
 * @param {string} name - The name of the user for whom the token is being generated.
 * @return {string} A signed JWT that includes the user's name and has a 24-hour expiration time.
 */
export function createToken(name: string) {
  return jwt.sign({ name: name }, secret, { expiresIn: '24h' });
}

/**
 * Validates the given token to determine its authenticity and structure.
 *
 * @param {string} token - The token to be validated.
 * @return {boolean} Returns true if the token is valid, otherwise false.
 */
export function isValidToken(token: string) {
  jwt.verify(token, secret, { complete: true });
}
