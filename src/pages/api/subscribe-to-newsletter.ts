export const prerender = false; // Disable prerendering for server-side endpoints

import type { APIRoute } from "astro";
import { dbNewsletterSubscribe } from "../../lib/db-newsletter-subscribe";
import { dbUserNewsletterExist } from "../../lib/db-user-newsletter-exist";
import { z } from "zod";

/**
 * Subscribes a user to the newsletter securely.
 *
 * This endpoint validates user input using Zod. It extracts form data,
 * ensures that required fields (including at least one newsletter category) are provided, and confirms
 * that the user does not already exist in the database. On passing validation, the function inserts
 * records into both the Users and Newsletter tables.
 *
 * Response Codes:
 * - 201: Subscription successful.
 * - 400: Invalid input or no newsletter category selected.
 * - 409: User already exists.
 * - 500: Internal server error during subscription.
 *
 * @returns A promise that resolves with a JSON response indicating the subscription result.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // Extract raw form data from the request
    const data = await request.formData();
    const rawData = {
      first_name: data.get("first_name")?.toString() || "",
      last_name: data.get("last_name")?.toString() || "",
      email: data.get("email")?.toString() || "",
      heaven: data.get("heaven") === "on",
      announcements: data.get("announcements") === "on",
      community: data.get("community") === "on",
      author: data.get("author") === "on",
      events: data.get("events") === "on",
      releases: data.get("releases") === "on",
    };

    // Define Zod schema for user data
    const userSchema = z.object({
      first_name: z.string().optional().transform((val) =>
        val ? val.trim().substring(0, 50) : ""
      ),
      last_name: z.string().optional().transform((val) =>
        val ? val.trim().substring(0, 50) : ""
      ),
      email: z.string().email().transform((val) => val.trim()),
    });

    // Define Zod schema for newsletter preferences with boolean flags defaulting to false
    const newsletterSchema = z.object({
      heaven: z.boolean().default(false),
      announcements: z.boolean().default(false),
      community: z.boolean().default(false),
      author: z.boolean().default(false),
      events: z.boolean().default(false),
      releases: z.boolean().default(false),
    });

    // Validate inputs for user and newsletter data
    const parsedUser = userSchema.parse({
      first_name: rawData.first_name,
      last_name: rawData.last_name,
      email: rawData.email,
    });

    const parsedNewsletter = newsletterSchema.parse({
      heaven: rawData.heaven,
      announcements: rawData.announcements,
      community: rawData.community,
      author: rawData.author,
      events: rawData.events,
      releases: rawData.releases,
    });

    // Ensure that at least one newsletter category is selected; if not, return a 400 response
    if (
      !parsedNewsletter.heaven &&
      !parsedNewsletter.announcements &&
      !parsedNewsletter.community &&
      !parsedNewsletter.author &&
      !parsedNewsletter.events &&
      !parsedNewsletter.releases
    ) {
      return new Response(
        JSON.stringify({ error: "Must choose a newsletter category" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the user already exists in the newsletter database; return 409 if so
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

    // Subscribe the user by inserting records into both Users and Newsletter tables
    await dbNewsletterSubscribe(parsedUser, parsedNewsletter);

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle validation errors: return a 400 response with a generic error message
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Log other errors and return a 500 response with the error message if available
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
