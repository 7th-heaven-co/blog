import { useEffect, useState } from 'react';
import type { FormStatus } from '../components/newsletter/types';

const palette = {
  success: 'green',
  error: 'red',
  loading: '#d3cbe7',
  default: 'gray',
} as const;

export function useFeedbackColor(status: FormStatus) {
  const [color, setColor] = useState(palette.default);

  useEffect(() => {
    setColor(palette[status] ?? palette.default);
  }, [status]);

  return color;
}
