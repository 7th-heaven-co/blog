import { db, eq, Newsletter } from "astro:db";

/**
 * Checks if a newsletter subscription exists for the given email address.
 *
 * This function queries the Newsletter table using astro:db to determine whether a subscription record
 * exists for the provided email address. It uses a parameterized query (via the `eq` helper) to mitigate SQL injection risks.
 * The function returns the subscription record if found; otherwise, it returns undefined.
 *
 * @param email - An object containing the email address to check. Example: { email: "user@example.com" }
 * @returns A promise that resolves with the newsletter subscription record if it exists, or undefined if not.
 *
 * Security Considerations:
 * - The query uses parameterized queries provided by astro:db, which helps prevent SQL injection.
 * - Input should be validated and sanitized on both the client and server sides before reaching this function.
 * - Ensure that any sensitive data (such as database credentials) is managed securely.
 */
export async function dbUserNewsletterExist(email: string): Promise<any> {
  // Extract the email string from the provided object for the query.
  const existingUserNews = await db
    .select()
    .from(Newsletter)
    .where(eq(Newsletter.news_email, email))
    .get();
  return existingUserNews;
}
