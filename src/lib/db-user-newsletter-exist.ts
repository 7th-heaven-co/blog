/**
 * Checks if a newsletter subscription exists for the given email address.
 *
 * This function queries the Newsletter table using astro:db to determine whether a subscription record
 * exists for the provided email address. It uses a parameterized query (via the `eq` helper) to mitigate SQL injection risks.
 * The function returns the subscription record if found; otherwise, it returns undefined.
 *
 * @param email - A string containing the email address to check.
 * @returns A promise that resolves with the newsletter subscription record if it exists, or undefined if not.
 *
 * Security Considerations:
 * - Input is validated using Zod before performing the query.
 * - Ensure that any sensitive data (such as database credentials) is managed securely.
 */
/**
 * Checks whether a subscribed newsletter row exists for the supplied email.
 *
 * Returns the joined Users × Newsletter row (or undefined) if it exists.
 */

import { z } from 'zod';
import getTursoClient from '../../db/client';

const client = getTursoClient();
const emailSchema = z.string().email();

export type UserNewsletterRow = Record<string, unknown>;

export async function dbUserNewsletterExist(email: string): Promise<UserNewsletterRow | undefined> {
  try {
    const validated = emailSchema.parse(email);

    const { rows } = await client.execute({
      sql: `
        SELECT u.*, n.*
        FROM Users AS u
        JOIN Newsletter AS n ON n.user_id = u.user_id
        WHERE u.user_email = ?
          AND n.news_active = 1
        LIMIT 1;
      `,
      args: [validated],
    });

    return rows[0];
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error('db-user-newsletter-exist | Invalid email:', error.message);
    } else if (error instanceof Error) {
      console.error('db-user-newsletter-exist | DB error:', error.message);
    } else {
      console.error('db-user-newsletter-exist | Unknown error:', error);
    }

    throw new Error('User/Newsletter lookup failed. Please try again.');
  }
}
