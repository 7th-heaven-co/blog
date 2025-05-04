import DOMPurify from 'dompurify';
import { useState } from 'react';
import { z } from 'zod';
import type { FormStatus, Prefs } from '../components/newsletter/types';

const formSchema = z.object({
  first_name: z
    .string()
    .optional()
    .transform((v) => (v ? DOMPurify.sanitize(v.trim()).slice(0, 50) : '')),
  last_name: z
    .string()
    .optional()
    .transform((v) => (v ? DOMPurify.sanitize(v.trim()).slice(0, 50) : '')),
  email: z
    .string()
    .email()
    .transform((v) => v.trim()),
  heaven: z.boolean().default(true),
  announcements: z.boolean().default(true),
  community: z.boolean().default(true),
  author: z.boolean().default(true),
  events: z.boolean().default(true),
  releases: z.boolean().default(true),
});

export function useSubscribe() {
  const [status, setStatus] = useState<FormStatus>('default');
  const [message, setMessage] = useState('');

  async function subscribe(raw: { first_name: string; last_name: string; email: string } & Prefs) {
    const result = formSchema.safeParse(raw);
    if (!result.success) {
      setStatus('error');
      setMessage(result.error.errors.map((e) => e.message).join('; '));
      return;
    }

    setStatus('loading');
    setMessage('Subscribing…');

    try {
      const payload = new FormData();
      const { first_name, last_name, email, ...prefs } = result.data;
      payload.append('first_name', first_name);
      payload.append('last_name', last_name);
      payload.append('email', email);
      for (const [k, v] of Object.entries(prefs) as [keyof Prefs, Prefs[keyof Prefs]][]) {
        if (v) payload.append(k, 'on');
      }

      const endpoint = '/api/subscribe-to-newsletter';

      const res = await fetch(endpoint, { method: 'POST', body: payload });

      const data = await res.json();

      if (data.error) {
        setStatus('error');
        setMessage(`Request failed: ${res.status} ${data.error as string}`);
      } else {
        setStatus('success');
        setMessage('Successfully subscribed!');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return { status, message, subscribe };
}
