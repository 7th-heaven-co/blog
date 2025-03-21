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

export const prerender = false;

import { z } from "zod";
import { createClient } from "@libsql/client/web";
import getTursoClient from "../../db/client";

const client = getTursoClient();

const emailSchema = z.string().email();

export async function dbUserExist(email: string): Promise<any> {
  try {
    // Validate the email input using the Zod schema.
    const validatedEmail = emailSchema.parse(email);

    const { rows } = await client.execute(`SELECT * FROM Users WHERE user_email = '${validatedEmail}'`);

    return rows[0];

  } catch (error: any) {
    console.error("File: db-user-exist | File Error\nError: ", error);

    // Handle validation errors from Zod.
    if (error instanceof z.ZodError) {
      throw new Error("DB User Error | Invalid email format provided.");
    }

    // Re-throw unexpected errors.
    throw new Error("DB User Exist Error:\nPlease try again.");
  }
}
