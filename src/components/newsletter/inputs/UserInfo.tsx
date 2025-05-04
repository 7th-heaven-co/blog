import DOMPurify from 'dompurify';
import { limitInputLength } from '../../../utils/isValidInput';

type Props = {
  onChange(): void; // proxy up to parent
};

export default function UserInfo({ onChange }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let sanitized = DOMPurify.sanitize(e.target.value);
    sanitized = limitInputLength(sanitized, 50);
    e.target.value = sanitized;
    onChange();
  };

  const blockPasteDrop = (e: React.ClipboardEvent | React.DragEvent) => e.preventDefault();

  return (
    <section id="userInfo">
      <div id="name">
        {[
          ['first_name', 'First Name'],
          ['last_name', 'Last Name'],
        ].map(([name, label]) => (
          <div className="container" key={name}>
            <label htmlFor={`${name}-input`}>{label}:</label>
            <input
              id={`${name}-input`}
              type="text"
              name={name}
              onChange={handleInputChange}
              onPaste={blockPasteDrop}
              onDrop={blockPasteDrop}
            />
          </div>
        ))}
      </div>

      <div id="email">
        <label htmlFor="email-input">Email:</label>
        <input id="email-input" type="email" name="email" onChange={handleInputChange} />
      </div>
    </section>
  );
}
