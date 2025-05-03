/**
 * SubscribeNewsletter Component
 *
 * Renders the newsletter sign‑up page.
 * When the subscription succeeds, a toast appears and the user is redirected home.
 */

import { useCallback, useEffect, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import SubscribeNewsletterForm from './SubscribeNewsletterForm.tsx';

const MESSAGE = 'Sign-up confirmation sent ...';

export default function SubscribeNewsletter() {
  // Subscription status: "", "loading", "success", "error", etc.
  const [status, setStatus] = useState('');

  /**
   * Memoised toast function so it’s stable across renders and can be safely
   * referenced in the useEffect dependency array.
   */
  const notify = useCallback(
    () =>
      toast(`✉️ ${MESSAGE}`, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      }),
    [], // MESSAGE is a module‑level constant, so no deps needed
  );

  /**
   * Trigger toast + redirect when the subscription succeeds.
   */
  useEffect(() => {
    if (status === 'success') {
      notify();
      const timer = setTimeout(() => {
        window.location.href = '/';
      }, 3000);
      return () => clearTimeout(timer); // cleanup if component unmounts
    }
  }, [status, notify]); // ← notify now in deps, fixes lint warning

  return (
    <main id="newsletter">
      <h1>Newsletter</h1>
      <h3>Sign-Up</h3>
      {status === 'success' && <p>Welcome to the 7th Heaven Newsletter! 🎉</p>}

      {/* Newsletter Subscription Form (client‑side only) */}
      <SubscribeNewsletterForm client:load status={status} setStatus={setStatus} />

      {/* Toast notifications */}
      <ToastContainer />
    </main>
  );
}
