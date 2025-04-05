export const prerender = false;

import { z } from "zod";
import { createClient } from "@libsql/client/web";
import getTursoClient from "../../db/client";

const client = getTursoClient();

// Define the schema for user input
const userSchema = z.object({
  first_name: z.string().optional().transform((val) => val?.trim().substring(0, 50) || ""),
  last_name: z.string().optional().transform((val) => val?.trim().substring(0, 50) || ""),
  email: z.string().email().transform((val) => val.trim()),
});

// Define the schema for newsletter preferences with default values
const newsletterSchema = z.object({
  heaven: z.boolean().optional().default(false),
  announcements: z.boolean().optional().default(false),
  community: z.boolean().optional().default(false),
  author: z.boolean().optional().default(false),
  events: z.boolean().optional().default(false),
  releases: z.boolean().optional().default(false),
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
 * This function validates and transforms the input using Zod before performing a batch insert
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

  const now = new Date().toISOString();

  try {
    // Prepare batch queries
    const queries = [
      {
        sql: `
          INSERT INTO Users (
            user_first_name,
            user_last_name,
            user_email,
            user_created_at,
            user_updated_at,
            user_flagged
          ) VALUES (?, ?, ?, ?, ?, ?);
        `,
        args: [
          parsedUser.first_name,
          parsedUser.last_name,
          parsedUser.email,
          now,
          now,
          0, // user_flagged as 0 (false)
        ],
      },
      {
        sql: `
          INSERT INTO Newsletter (
            user_id,
            news_email,
            news_heaven,
            news_announcements,
            news_community,
            news_events,
            news_author,
            news_releases,
            news_active
          ) VALUES (
            last_insert_rowid(),
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
          );
        `,
        args: [
          parsedUser.email,
          parsedNewsletter.heaven ? 1 : 0,
          parsedNewsletter.announcements ? 1 : 0,
          parsedNewsletter.community ? 1 : 0,
          parsedNewsletter.events ? 1 : 0,
          parsedNewsletter.author ? 1 : 0,
          parsedNewsletter.releases ? 1 : 0,
          1, // news_active as 1 (true)
        ],
      },
    ];

    // Execute the batch of queries
    const result = await client.batch(queries);

    return { success: true };
    
  } catch (error) {
    console.error("File: db-newsletter-subscribe | Database error:", error);

    throw new Error("Newsletter Subscribe Error: Please try again.");
  }
}