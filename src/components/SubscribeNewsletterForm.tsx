/**
 * SubscribeNewsletterForm Component
 *
 * This component renders a newsletter subscription form, sanitizes and validates inputs using DOMPurify and Zod,
 * handles form submission, and displays feedback to the user.
 */

import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import DOMPurify from "dompurify";
import { z } from "zod";
import { limitInputLength } from "../utils/isValidInput";

// Define a Zod schema for the complete form data.
const formSchema = z.object({
  first_name: z.string().optional().transform((val) =>
    val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : ""
  ),
  last_name: z.string().optional().transform((val) =>
    val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : ""
  ),
  email: z.string().email().transform((val) => val.trim()),
  announcements: z.boolean().default(false),
  events: z.boolean().default(false),
  community_notes: z.boolean().default(false),
  updates: z.boolean().default(false),
});

export default function SubscribeNewsletterForm({ status, setStatus }) {
  // State variables for feedback message and its display color.
  const [responseMessage, setResponseMessage] = useState("");
  const [color, setColor] = useState("gray");

  // Mapping for UI feedback colors based on status.
  const colors: Record<string, string> = {
    success: "green",
    error: "red",
    warning: "orange",
    default: "gray",
    loading: "#d3cbe7",
  };

  /**
   * Handles form submission by gathering raw data,
   * validating and sanitizing it using Zod and DOMPurify,
   * and sending the sanitized data via a POST request.
   *
   * @param e - The form submission event.
   */
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // Construct a raw data object from the form.
    const rawData = {
      first_name: formData.get("first_name")?.toString() || "",
      last_name: formData.get("last_name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      announcements: formData.get("announcements") === "on",
      events: formData.get("events") === "on",
      community_notes: formData.get("community_notes") === "on",
      updates: formData.get("updates") === "on",
    };

    // Validate and sanitize inputs using Zod.
    const result = formSchema.safeParse(rawData);
    if (!result.success) {
      // Concatenate error messages and update UI.
      const errorMessages = result.error.errors.map((err) => err.message).join("; ");
      setResponseMessage(`Validation error: ${errorMessages}`);
      setStatus("error");
      return;
    }
    const validatedData = result.data;

    // Create a new FormData object from the sanitized, validated data.
    const sanitizedFormData = new FormData();
    sanitizedFormData.append("first_name", validatedData.first_name || "");
    sanitizedFormData.append("last_name", validatedData.last_name || "");
    sanitizedFormData.append("email", validatedData.email);
    if (validatedData.announcements) sanitizedFormData.append("announcements", "on");
    if (validatedData.events) sanitizedFormData.append("events", "on");
    if (validatedData.community_notes) sanitizedFormData.append("community_notes", "on");
    if (validatedData.updates) sanitizedFormData.append("updates", "on");

    // Update UI state to show loading feedback.
    setStatus("loading");
    setResponseMessage("Subscribing...");
    setColor(colors.loading);

    try {
      // Send the sanitized form data to the subscription API endpoint.
      const response = await fetch("/api/subscribe-to-newsletter", {
        method: "POST",
        body: sanitizedFormData,
      });
      const data = await response.json();

      if (data.error) {
        setResponseMessage(data.error);
        setStatus("error");
      } else {
        setResponseMessage("Successfully subscribed!");
        setStatus("success");
      }
    } catch (error) {
      setResponseMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  /**
   * Handles real-time input changes by sanitizing the value as the user types.
   * This prevents disallowed content from being entered.
   *
   * @param e - The change event from an input element.
   */
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    let sanitizedValue = DOMPurify.sanitize(e.target.value);
    sanitizedValue = limitInputLength(sanitizedValue, 50);
    setResponseMessage("");
    e.target.value = sanitizedValue;
  }

  // Update the UI color whenever the status changes.
  useEffect(() => {
    setColor(colors[status] || colors.default);
  }, [status]);

  switch (status) {
  case "success":
    return (
      <div className="sub-news-form-empty frosted-container bg-frosted-dark-faded">
        <div className="container">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18 6h2v2h-2zm-2 4V8h2v2zm-2 2v-2h2v2zm-2 2h2v-2h-2zm-2 2h2v-2h-2zm-2 0v2h2v-2zm-2-2h2v2H6zm0 0H4v-2h2z" />
          </svg>
        </div>
      </div>
    );
  case "loading":
    return (
      <div className="sub-news-form-empty frosted-container spinner-container bg-frosted-dark-faded">
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      </div>
    );
  default:
    return (
      <form role="form" method="POST" onSubmit={submit} className="bg-frosted-dark">
        <section id="userInfo">
          <div id="name">
            {/* First Name Input */}
            <div className="container">
              <label htmlFor="first-name-input">
                <span>(Optional)</span>
                <span >First Name:</span>
              </label>
              <input
                id="first-name-input"
                type="text"
                name="first_name"
                onChange={handleInputChange}
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
              />
            </div>
            {/* Last Name Input */}
            <div className="container">
              <label htmlFor="last-name-input">
                <span>(Optional)</span>
                <span >Last Name:</span>
              </label>
              <input
                id="last-name-input"
                type="text"
                name="last_name"
                onChange={handleInputChange}
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
              />
            </div>
          </div>
          {/* Email Input */}
          <div id="email">
            <div className="container">
              <label htmlFor="email-input">Email:</label>
              <input
                id="email-input"
                type="email"
                name="email"
                onChange={handleInputChange}
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </section>
        {/* Newsletter Preferences */}
        <section id="preferences">
          <ul>
            <li>
              <div className="container">
                <span>
                  <input type="checkbox" name="announcements" onChange={handleInputChange} />
                </span>
                <label>Announcements</label>
              </div>
              <p>Important updates to 7th Heaven</p>
            </li>
            <li>
              <div className="container">
                <span>
                  <input type="checkbox" name="events" onChange={handleInputChange} />
                </span>
                <label>Events</label>
              </div>
              <p>Meet-ups and product give-aways</p>
            </li>
            <li>
              <div className="container">
                <span>
                  <input type="checkbox" name="community_notes" onChange={handleInputChange} />
                </span>
                <label>Community Notes</label>
              </div>
              <p>Author speaking directly to the community</p>
            </li>
            <li>
              <div className="container">
                <span>
                  <input type="checkbox" name="updates" onChange={handleInputChange} />
                </span>
                <label>Updates</label>
              </div>
              <p>Be notified when new chapters are released</p>
            </li>
            {/* Display response message with dynamic color styling */}
            <li>{responseMessage && <p style={{ color }}>{responseMessage}</p>}</li>
          </ul>
        </section>
        <button>Submit</button>
      </form>
    );
  }
}