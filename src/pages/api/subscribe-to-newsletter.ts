export const prerender = false; // Not needed in 'server' mode

import type { APIRoute } from "astro";
import { dbNewsletterSubscribe } from "../../lib/db-newsletter-subscribe";
import { dbUserNewsletterExist } from "../../lib/db-user-newsletter-exist";
import { db } from "astro:db";
import { z } from "zod";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Set up DOMPurify for server-side sanitization
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/**
 * Subscribes a user to the newsletter securely.
 *
 * This function validates and transforms the input using Zod and DOMPurify before performing a batch insert
 * into the Users and Newsletter tables. It ensures the email is valid, sanitizes name fields (trimming and limiting their length),
 * and confirms that at least one newsletter category is selected. If a user with the same email already exists,
 * or if the database operation fails, an error is thrown.
 *
 * @returns A promise that resolves with a JSON response indicating the subscription result.
 *          On success, a status code of 201 is returned. On Zod validation errors, a status code of 400 is returned.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const rawData = {
      first_name: data.get("first_name")?.toString() || "",
      last_name: data.get("last_name")?.toString() || "",
      email: data.get("email")?.toString() || "",
      announcements: data.get("announcements") === "on",
      events: data.get("events") === "on",
      community_notes: data.get("community_notes") === "on",
      updates: data.get("updates") === "on",
    };

    // Define Zod schema for user data using DOMPurify for sanitization
    const userSchema = z.object({
      first_name: z.string().optional().transform((val) =>
        val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : ""
      ),
      last_name: z.string().optional().transform((val) =>
        val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : ""
      ),
      email: z.string().email().transform((val) => val.trim()),
    });

    // Define Zod schema for newsletter preferences
    const newsletterSchema = z.object({
      announcements: z.boolean().default(false),
      events: z.boolean().default(false),
      community_notes: z.boolean().default(false),
      updates: z.boolean().default(false),
    });

    // Validate and sanitize inputs
    const parsedUser = userSchema.parse({
      first_name: rawData.first_name,
      last_name: rawData.last_name,
      email: rawData.email,
    });

    const parsedNewsletter = newsletterSchema.parse({
      announcements: rawData.announcements,
      events: rawData.events,
      community_notes: rawData.community_notes,
      updates: rawData.updates,
    });

    // Ensure that at least one newsletter category is selected
    if (
      !parsedNewsletter.announcements &&
      !parsedNewsletter.events &&
      !parsedNewsletter.community_notes &&
      !parsedNewsletter.updates
    ) {
      return new Response(
        JSON.stringify({ error: "Must choose a newsletter category" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the user already exists in the newsletter database
    const existingUser = await dbUserNewsletterExist(parsedUser.email);
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Subscribe the user by inserting into both Users and Newsletter tables
    await dbNewsletterSubscribe(parsedUser, parsedNewsletter);

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Check for Zod validation errors and return a 400 status code with the error details
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid input"
    }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    else if (error instanceof Error) {
      console.error("Subscription Error:", error);
      return new Response(
        JSON.stringify({ error: error.message || "An error occurred while subscribing." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      console.error("Subscription Error:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred while subscribing." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
};
