/**
 * SubscribeNewsletterForm Component
 *
 * This component renders a newsletter subscription form where users can enter their first name,
 * last name, and email address, and choose which newsletter topics to subscribe to.
 * It sanitizes and validates user inputs using DOMPurify and Zod, manages controlled state for
 * newsletter preferences (including an "All" checkbox to toggle all topics), handles form submission,
 * and provides feedback to the user based on the subscription status.
 */

import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import DOMPurify from "dompurify";
import { z } from "zod";
import { limitInputLength } from "../utils/isValidInput";

// Define a Zod schema for the form data to validate and sanitize user input.
const formSchema = z.object({
  first_name: z.string().optional().transform((val) =>
    val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : ""
  ),
  last_name: z.string().optional().transform((val) =>
    val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : ""
  ),
  email: z.string().email().transform((val) => val.trim()),
  heaven: z.boolean().default(true),
  announcements: z.boolean().default(true),
  community: z.boolean().default(true),
  author: z.boolean().default(true),
  events: z.boolean().default(true),
  releases: z.boolean().default(true),
});

export default function SubscribeNewsletterForm({ status, setStatus }) {
  // State variables for response feedback and its color.
  const [responseMessage, setResponseMessage] = useState("");
  const [color, setColor] = useState("gray");

  // Controlled state for newsletter preferences checkboxes.
  const [preferences, setPreferences] = useState({
    heaven: true,
    announcements: true,
    community: true,
    author: true,
    events: true,
    releases: true,
  });

  // Compute if the "All" checkbox should be checked (only if all individual preferences are true).
  const allChecked = Object.values(preferences).every(Boolean);

  // Handler for toggling the "All" checkbox.
  // When clicked, it sets every individual preference to the checked value.
  function handleAllCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setPreferences({
      heaven: checked,
      announcements: checked,
      community: checked,
      author: checked,
      events: checked,
      releases: checked,
    });
  }

  // Handler for individual newsletter preference checkboxes.
  function handlePreferenceChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked,
    }));
  }

  // Handler for text input changes (first name, last name, email).
  // It sanitizes input and limits the number of characters.
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    let sanitizedValue = DOMPurify.sanitize(e.target.value);
    sanitizedValue = limitInputLength(sanitizedValue, 50);
    setResponseMessage(""); // Clear any existing feedback messages.
    e.target.value = sanitizedValue;
  }

  // Update the feedback color based on the current subscription status.
  useEffect(() => {
    const colors = {
      success: "green",
      error: "red",
      warning: "orange",
      default: "gray",
      loading: "#d3cbe7",
    };
    setColor(colors[status] || colors.default);
  }, [status]);

  // Form submission handler.
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // Gather raw data from the form and override checkbox values with controlled state.
    const rawData = {
      first_name: formData.get("first_name")?.toString() || "",
      last_name: formData.get("last_name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      heaven: preferences.heaven,
      announcements: preferences.announcements,
      community: preferences.community,
      author: preferences.author,
      events: preferences.events,
      releases: preferences.releases,
    };

    // Validate and sanitize data using the Zod schema.
    const result = formSchema.safeParse(rawData);
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join("; ");
      setResponseMessage(`Validation error: ${errorMessages}`);
      setStatus("error");
      return;
    }
    const validatedData = result.data;

    // Build a new FormData object with the sanitized data for submission.
    const sanitizedFormData = new FormData();
    sanitizedFormData.append("first_name", validatedData.first_name || "");
    sanitizedFormData.append("last_name", validatedData.last_name || "");
    sanitizedFormData.append("email", validatedData.email);
    if (validatedData.heaven) sanitizedFormData.append("heaven", "on");
    if (validatedData.announcements) sanitizedFormData.append("announcements", "on");
    if (validatedData.community) sanitizedFormData.append("community", "on");
    if (validatedData.author) sanitizedFormData.append("author", "on");
    if (validatedData.events) sanitizedFormData.append("events", "on");
    if (validatedData.releases) sanitizedFormData.append("releases", "on");

    // Set loading state and provide feedback.
    setStatus("loading");
    setResponseMessage("Subscribing...");

    try {
      // Submit the form data to the API endpoint.
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
      // Handle any errors during submission.
      setResponseMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  // Render different UI based on the current subscription status.
  switch (status) {
    case "success":
    return (
      <div className="sub-news-form-empty frosted-container spinner-container bg-frosted-dark-faded">
        <div className="spinner-overlay">
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
              <div className="container">
                <label htmlFor="first-name-input">
                  <span>(Optional)</span>
                  <span>First Name:</span>
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
              <div className="container">
                <label htmlFor="last-name-input">
                  <span>(Optional)</span>
                  <span>Last Name:</span>
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
          <section id="preferences">
            <ul>
              {/* "All" checkbox to toggle all newsletter topics */}
              <li>
                <div className="container">
                  <span>
                    <input
                      type="checkbox"
                      name="all"
                      checked={allChecked}
                      onChange={handleAllCheckboxChange}
                    />
                  </span>
                  <label>All</label>
                </div>
                <p>Subscribe to All Categories</p>
              </li>
              {/* Individual newsletter topic checkboxes */}
              <li>
                <div className="container">
                  <span>
                    <input
                      type="checkbox"
                      name="heaven"
                      checked={preferences.heaven}
                      onChange={handlePreferenceChange}
                    />
                  </span>
                  <label><span>Category:&nbsp;</span>7th-Heaven</label>
                </div>
                <p>New chapter releases for 7th Heaven</p>
              </li>
              <li>
                <div className="container">
                  <span>
                    <input
                      type="checkbox"
                      name="announcements"
                      checked={preferences.announcements}
                      onChange={handlePreferenceChange}
                    />
                  </span>
                  <label><span>Category:&nbsp;</span>Announcements</label>
                </div>
                <p>Important updates to 7th Heaven</p>
              </li>
              <li>
                <div className="container">
                  <span>
                    <input
                      type="checkbox"
                      name="community"
                      checked={preferences.community}
                      onChange={handlePreferenceChange}
                    />
                  </span>
                  <label><span>Category:&nbsp;</span>Community</label>
                </div>
                <p>Community and Social Media updates</p>
              </li>
              <li>
                <div className="container">
                  <span>
                    <input
                      type="checkbox"
                      name="author"
                      checked={preferences.author}
                      onChange={handlePreferenceChange}
                    />
                  </span>
                  <label><span>Category:&nbsp;</span>Author</label>
                </div>
                <p>Author speaking directly to the community</p>
              </li>
              <li>
                <div className="container">
                  <span>
                    <input
                      type="checkbox"
                      name="events"
                      checked={preferences.events}
                      onChange={handlePreferenceChange}
                    />
                  </span>
                  <label><span>Category:&nbsp;</span>Events</label>
                </div>
                <p>Meet-ups and product give-aways</p>
              </li>
              <li>
                <div className="container">
                  <span>
                    <input
                      type="checkbox"
                      name="releases"
                      checked={preferences.releases}
                      onChange={handlePreferenceChange}
                    />
                  </span>
                  <label><span>Category:&nbsp;</span>Releases</label>
                </div>
                <p>New chapter releases for all novels</p>
              </li>
              {/* Display any feedback message */}
              <li>
                {responseMessage && <p style={{ color }}>{responseMessage}</p>}
              </li>
            </ul>
          </section>
          <button>Submit</button>
        </form>
      );
  }
}
