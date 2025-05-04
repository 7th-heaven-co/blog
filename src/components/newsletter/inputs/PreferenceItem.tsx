type Props = {
  id: keyof Prefs;
  label: string;
  desc: string;
  checked: boolean;
  onToggle(id: keyof Prefs, checked: boolean): void;
};

export default function PreferenceItem({ id, label, desc, checked, onToggle }: Props) {
  return (
    <li>
      <div className="container">
        <span>
          <input
            id={`${id}-checkbox`}
            type="checkbox"
            name={id}
            checked={checked}
            onChange={(e) => onToggle(id, e.target.checked)}
          />
        </span>
        <label htmlFor={`${id}-checkbox`}>
          <span>Category:&nbsp;</span>
          {label}
        </label>
      </div>
      <p>{desc}</p>
    </li>
  );
}
