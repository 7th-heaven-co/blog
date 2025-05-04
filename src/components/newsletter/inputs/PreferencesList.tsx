import type { Prefs } from '../types';
import PreferenceItem from './PreferenceItem';

const prefsMeta = [
  ['heaven', '7th-Heaven', 'New chapter releases for 7th Heaven'],
  ['announcements', 'Announcements', 'Important updates to 7th Heaven'],
  ['community', 'Community', 'Community and Social Media updates'],
  ['author', 'Author', 'Author speaking directly to the community'],
  ['events', 'Events', 'Meet-ups and product give-aways'],
  ['releases', 'Releases', 'New chapter releases for all novels'],
] as const;

type Props = {
  prefs: Prefs;
  allChecked: boolean;
  toggleAll(checked: boolean): void;
  toggleOne(id: keyof Prefs, checked: boolean): void;
};

export default function PreferencesList({ prefs, allChecked, toggleAll, toggleOne }: Props) {
  return (
    <section id="preferences">
      <ul>
        {/* All */}
        <li>
          <div className="container">
            <span>
              <input
                id="all-checkbox"
                type="checkbox"
                name="all"
                checked={allChecked}
                onChange={(e) => toggleAll(e.target.checked)}
              />
            </span>
            <label htmlFor="all-checkbox">All</label>
          </div>
          <p>Subscribe to All Categories</p>
        </li>

        {/* Individual */}
        {prefsMeta.map(([id, label, desc]) => (
          <PreferenceItem
            key={id}
            id={id as keyof Prefs}
            label={label}
            desc={desc}
            checked={prefs[id as keyof Prefs]}
            onToggle={toggleOne}
          />
        ))}
      </ul>
    </section>
  );
}
