/**
 * Checks if a newsletter subscription exists for the given email address.
 *
 * This function queries the Users table using a Turso database client to determine whether a subscription record
 * exists for the provided email address. It validates the email input using Zod, ensuring a proper email format
 * before executing the query. The function returns the newsletter subscription record if found; otherwise, it returns undefined.
 *
 * @param email - A string containing the email address to check.
 * @returns A promise that resolves with the newsletter subscription record if it exists, or undefined if not.
 *
 * Security Considerations:
 * - Input is validated using Zod before performing the query.
 * - Ensure that any sensitive data (such as database credentials) is managed securely.
 */

/**
 * Checks whether a user row exists for the supplied email.
 *
 * Returns the matching DB row (or undefined) if it exists.
 */

export const prerender = false;

import { z } from 'zod';
import getTursoClient from '../../db/client';

const client = getTursoClient();
const emailSchema = z.string().email();

/** Minimal shape expected from Users table */
export type UserRow = Record<string, unknown>;

export async function dbUserExist(email: string): Promise<UserRow | undefined> {
  try {
    const validatedEmail = emailSchema.parse(email);

    const { rows } = await client.execute({
      sql: 'SELECT * FROM Users WHERE user_email = ? LIMIT 1;',
      args: [validatedEmail],
    });

    return rows[0];
  } catch (error: unknown) {
    console.error('File: db-user-exist | Error:', error);

    if (error instanceof z.ZodError) {
      throw new Error('DB User Error | Invalid email format provided.');
    }

    throw new Error('DB User Exist Error. Please try again.');
  }
}
