import { db, eq, Users } from "astro:db";

/**
 * Interface representing an email address.
 */
interface Email {
  email: string;
}

/**
 * Checks if a user exists with the given email address.
 *
 * This function queries the Users table using astro:db to determine whether a user record exists
 * for the provided email address. It utilizes a parameterized query (via the `eq` helper) to mitigate SQL injection risks.
 *
 * @param email - An object containing the email address to check. Example: { email: "user@example.com" }
 * @returns A promise that resolves with the user record if found, or undefined if no matching user is found.
 *
 * Security Considerations:
 * - The function uses parameterized queries, which helps protect against SQL injection.
 * - Input validation and sanitization should be performed before invoking this function to ensure the email format is valid.
 * - Ensure that database credentials and connection settings are managed securely.
 */
export async function dbUserExist(email: Email): Promise<any> {
  // Extract the email string from the provided object for the query.
  const existingUser = await db
    .select()
    .from(Users)
    .where(eq(Users.user_email, email.email))
    .get();
  return existingUser;
}
