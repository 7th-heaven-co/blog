import React, { useEffect, type FormEvent } from 'react';
import { useFeedbackColor } from '../../../hooks/useFeedbackColor';
import { useNewsletterPreferences } from '../../../hooks/useNewsletterPreferences';
import { useSubscribe } from '../../../hooks/useSubscribe';
import PreferencesList from '../inputs/PreferencesList';
import UserInfo from '../inputs/UserInfo';
import LoadingState from './LoadingState';
import SuccessState from './SuccessState';

export default function SubscribeNewsletterForm({
  setStatus,
}: { setStatus: (s: FormStatus) => void }) {
  /* state + hooks -------------------------------------------------- */
  const { prefs, allChecked, toggleAll, toggleOne } = useNewsletterPreferences();
  const { status, message, subscribe } = useSubscribe();
  const color = useFeedbackColor(status);

  useEffect(() => {
    setStatus(status);
  }, [status, setStatus]);

  /* submit --------------------------------------------------------- */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    subscribe({
      first_name: (fd.get('first_name') as string) ?? '',
      last_name: (fd.get('last_name') as string) ?? '',
      email: (fd.get('email') as string) ?? '',
      ...prefs,
    });
  };

  /* status-based UIs ---------------------------------------------- */
  if (status === 'success') return <SuccessState />;
  if (status === 'loading') return <LoadingState />;

  /* default/error form -------------------------------------------- */
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <UserInfo onChange={() => undefined} />

      <PreferencesList
        prefs={prefs}
        allChecked={allChecked}
        toggleAll={toggleAll}
        toggleOne={toggleOne}
      />

      {message && (
        <p style={{ color }} className="feedback">
          {message}
        </p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}
