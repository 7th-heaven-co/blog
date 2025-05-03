/**
 * SubscribeNewsletterForm Component
 *
 * Renders a newsletter‑subscription form, validates / sanitises input with Zod + DOMPurify,
 * handles checkbox logic (including an “All” toggle), submits to `/api/subscribe-to-newsletter`,
 * and shows state‑based feedback.
 */

import DOMPurify from 'dompurify';
import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { z } from 'zod';
import { limitInputLength } from '../../utils/isValidInput';

/* ── Zod schema ───────────────────────────────────────────────────────── */
const formSchema = z.object({
  first_name: z
    .string()
    .optional()
    .transform((val) => (val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : '')),
  last_name: z
    .string()
    .optional()
    .transform((val) => (val ? DOMPurify.sanitize(val.trim()).substring(0, 50) : '')),
  email: z
    .string()
    .email()
    .transform((val) => val.trim()),
  heaven: z.boolean().default(true),
  announcements: z.boolean().default(true),
  community: z.boolean().default(true),
  author: z.boolean().default(true),
  events: z.boolean().default(true),
  releases: z.boolean().default(true),
});

/* ── props ────────────────────────────────────────────────────────────── */
interface SubscribeNewsletterFormProps {
  status: 'default' | 'loading' | 'success' | 'error' | string;
  setStatus: (s: string) => void;
}

/* ── component ────────────────────────────────────────────────────────── */
export default function SubscribeNewsletterForm({
  status,
  setStatus,
}: SubscribeNewsletterFormProps) {
  /* feedback */
  const [responseMessage, setResponseMessage] = useState('');
  const [color, setColor] = useState('gray');

  /* newsletter preferences */
  type Prefs = {
    heaven: boolean;
    announcements: boolean;
    community: boolean;
    author: boolean;
    events: boolean;
    releases: boolean;
  };

  const [preferences, setPreferences] = useState<Prefs>({
    heaven: true,
    announcements: true,
    community: true,
    author: true,
    events: true,
    releases: true,
  });

  const allChecked = Object.values(preferences).every(Boolean);

  /* ── handlers ──────────────────────────────────────────────────── */
  const handleAllCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setPreferences({
      heaven: checked,
      announcements: checked,
      community: checked,
      author: checked,
      events: checked,
      releases: checked,
    });
  };

  const handlePreferenceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let sanitised = DOMPurify.sanitize(e.target.value);
    sanitised = limitInputLength(sanitised, 50);
    setResponseMessage('');
    e.target.value = sanitised;
  };

  /* colour feedback */
  useEffect(() => {
    const colours = {
      success: 'green',
      error: 'red',
      warning: 'orange',
      default: 'gray',
      loading: '#d3cbe7',
    } as const;
    setColor(colours[status as keyof typeof colours] ?? colours.default);
  }, [status]);

  /* ── submit ─────────────────────────────────────────────────────── */
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const rawData = {
      first_name: formData.get('first_name')?.toString() ?? '',
      last_name: formData.get('last_name')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      ...preferences,
    };

    const result = formSchema.safeParse(rawData);
    if (!result.success) {
      setResponseMessage(
        `Validation error: ${result.error.errors.map((err) => err.message).join('; ')}`,
      );
      setStatus('error');
      return;
    }

    const validated = result.data;
    const payload = new FormData();
    payload.append('first_name', validated.first_name);
    payload.append('last_name', validated.last_name);
    payload.append('email', validated.email);

    /* changed: for…of loop (no forEach) */
    for (const key of [
      'heaven',
      'announcements',
      'community',
      'author',
      'events',
      'releases',
    ] as const) {
      if (validated[key]) payload.append(key, 'on');
    }

    setStatus('loading');
    setResponseMessage('Subscribing...');

    try {
      const subscribe = '../../api/subscribe-to-newsletter';
      const res = await fetch(subscribe, { method: 'POST', body: payload });
      const data = await res.json();
      if (data.error) {
        setResponseMessage(data.error);
        setStatus('error');
      } else {
        setResponseMessage('Successfully subscribed!');
        setStatus('success');
      }
    } catch {
      setResponseMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  /* ── UI states ──────────────────────────────────────────────────── */
  if (status === 'success') {
    return (
      <div className="sub-news-form-empty frosted-container spinner-container bg-frosted-dark-faded">
        <div className="spinner-overlay">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            role="img"
            aria-labelledby="successIconTitle"
          >
            <title id="successIconTitle">Subscription successful</title>
            <path
              fill="currentColor"
              d="M18 6h2v2h-2zm-2 4V8h2v2zm-2 2v-2h2v2zm-2 2h2v-2h-2zm-2 2h2v-2h-2zm-2 0v2h2v-2zm-2-2h2v2H6zm0 0H4v-2h2z"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="sub-news-form-empty frosted-container spinner-container bg-frosted-dark-faded">
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  /* ── default / error form ───────────────────────────────────────── */
  return (
    <form method="POST" onSubmit={submit} className="bg-frosted-dark">
      {/* user info */}
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

      {/* preferences */}
      <section id="preferences">
        <ul>
          {/* all */}
          <li>
            <div className="container">
              <span>
                <input
                  id="all-checkbox"
                  type="checkbox"
                  name="all"
                  checked={allChecked}
                  onChange={handleAllCheckboxChange}
                />
              </span>
              <label htmlFor="all-checkbox">All</label>
            </div>
            <p>Subscribe to All Categories</p>
          </li>

          {/* individual categories */}
          {(
            [
              ['heaven', '7th‑Heaven', 'New chapter releases for 7th Heaven'],
              ['announcements', 'Announcements', 'Important updates to 7th Heaven'],
              ['community', 'Community', 'Community and Social Media updates'],
              ['author', 'Author', 'Author speaking directly to the community'],
              ['events', 'Events', 'Meet‑ups and product give‑aways'],
              ['releases', 'Releases', 'New chapter releases for all novels'],
            ] as const
          ).map(([key, labelText, desc]) => (
            <li key={key}>
              <div className="container">
                <span>
                  <input
                    id={`${key}-checkbox`}
                    type="checkbox"
                    name={key}
                    checked={preferences[key]}
                    onChange={handlePreferenceChange}
                  />
                </span>
                <label htmlFor={`${key}-checkbox`}>
                  <span>Category:&nbsp;</span>
                  {labelText}
                </label>
              </div>
              <p>{desc}</p>
            </li>
          ))}

          {/* feedback */}
          {responseMessage && (
            <li>
              <p style={{ color }}>{responseMessage}</p>
            </li>
          )}
        </ul>
      </section>

      <button type="submit">Submit</button>
    </form>
  );
}
