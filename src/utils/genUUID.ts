import { v4 as uuidv4 } from 'uuid';

export default function genUUID(): string {
  const id = uuidv4();
  return id;
}
