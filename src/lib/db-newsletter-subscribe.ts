import { db, eq, isDbError, Users, Newsletter } from "astro:db";
import { z } from "zod";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Setup DOMPurify with a JSDOM window (suitable for server-side usage)
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Define the schema for user input with transformation for sanitization
const userSchema = z.object({
  first_name: z
    .string()
    .optional()
    .transform((val) =>
      val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : ""
    ),
  last_name: z
    .string()
    .optional()
    .transform((val) =>
      val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : ""
    ),
  email: z.string().email().transform((val) => val.trim()),
});

// Define the schema for newsletter preferences with default values
const newsletterSchema = z.object({
  announcements: z.boolean().optional().default(false),
  events: z.boolean().optional().default(false),
  community_notes: z.boolean().optional().default(false),
  updates: z.boolean().optional().default(false),
});

// Export inferred types if needed elsewhere
export type UserData = z.infer<typeof userSchema>;
export type NewsletterPreferences = z.infer<typeof newsletterSchema>;

export interface SubscriptionResult {
  success: boolean;
}

/**
 * Subscribes a user to the newsletter securely.
 *
 * This function validates and transforms the input using Zod and DOMPurify before performing a batch insert
 * into the Users and Newsletter tables. If validation fails or the database operation encounters an issue,
 * an error is thrown.
 *
 * @param user - An object containing first_name, last_name, and email.
 * @param newsletter - An object containing newsletter preferences.
 * @returns A promise that resolves with the subscription result.
 */
export async function dbNewsletterSubscribe(
  user: userSchema,
  newsletter: newsletterSchema
): Promise<SubscriptionResult> {
  // Validate and sanitize input using Zod schemas
  const parsedUser = userSchema.parse(user);
  const parsedNewsletter = newsletterSchema.parse(newsletter);

  try {
    // Use a transaction for atomic operations
    await db.transaction(async (tx) => {
      // Insert the user and retrieve the generated ID
      const userResult = await tx.insert(Users).values({
        user_first_name: parsedUser.first_name,
        user_last_name: parsedUser.last_name,
        user_email: parsedUser.email,
        user_created_at: new Date(),
        user_updated_at: new Date(),
        user_flagged: false,
      });

      const [ user ] = await tx.select({ id : Users.id }).from(Users).where(eq(Users.user_email, parsedUser.email));

      // Now insert the newsletter subscription with the proper user id
      await tx.insert(Newsletter).values({
        user_id: user.id,
        news_email: parsedUser.email,
        news_announcements: parsedNewsletter.announcements,
        news_events: parsedNewsletter.events,
        news_community_notes: parsedNewsletter.community_notes,
        news_updates: parsedNewsletter.updates,
        news_active: true,
      });
    });
    return { success: true };
  } catch (error) {
    if (isDbError(error)) {
      console.error("Database error:", error.message);
    }
    console.error("Database error:", error);
    throw new Error("Something went wrong. Please try again.");
  }
}

