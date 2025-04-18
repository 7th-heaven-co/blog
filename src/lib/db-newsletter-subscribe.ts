// src/lib/db-user-newsletter-exist.ts
import getTursoClient from '../../db/client';

const client = getTursoClient();

/**
 * Checks whether a user already exists in the Users / Newsletter tables.
 *
 * @param email – user’s email
 * @returns the matching row (or undefined) if it exists
 */
export async function dbUserNewsletterExist(email: string) {
  try {
    const { rows } = await client.execute({
      sql: `
        SELECT u.*, n.*
        FROM Users      AS u
        JOIN Newsletter AS n ON n.user_id = u.user_id
        WHERE u.user_email = ?
          AND n.news_active = 1
        LIMIT 1;
      `,
      args: [email],
    });

    return rows[0];
  } catch (error: unknown) {
    // Narrow unknown → Error for type‑safe logging
    if (error instanceof Error) {
      console.error('File: db-user-newsletter-exist | DB error:', error.message);
    } else {
      console.error('File: db-user-newsletter-exist | Unknown error:', error);
    }

    throw new Error('User/Newsletter lookup failed. Please try again.');
  }
}
