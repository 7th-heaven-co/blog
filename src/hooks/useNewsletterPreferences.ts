import { useCallback, useState } from 'react';
import type { Prefs } from '../components/newsletter/types';

const defaultPrefs: Prefs = {
  heaven: true,
  announcements: true,
  community: true,
  author: true,
  events: true,
  releases: true,
};

export function useNewsletterPreferences() {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);

  const allChecked = Object.values(prefs).every(Boolean);

  const toggleAll = useCallback((checked: boolean) => {
    setPrefs({
      heaven: checked,
      announcements: checked,
      community: checked,
      author: checked,
      events: checked,
      releases: checked,
    });
  }, []);

  const toggleOne = useCallback((name: keyof Prefs, checked: boolean) => {
    setPrefs((prev) => ({ ...prev, [name]: checked }));
  }, []);

  return { prefs, allChecked, toggleAll, toggleOne };
}
