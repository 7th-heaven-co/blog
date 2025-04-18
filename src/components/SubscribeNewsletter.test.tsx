import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import SubscribeNewsletter from './SubscribeNewsletter';

/* ── mocks ──────────────────────────────────────────────────────────── */
// Mock the SubscribeNewsletterForm component.
vi.mock('../components/SubscribeNewsletterForm.tsx', () => ({
  default: (props: { setStatus: (status: string) => void }) => {
    React.useEffect(() => {
      props.setStatus('success'); // simulate success
    }, [props.setStatus]); // ← added dep
    return <div data-testid="fake-form" />;
  },
}));

// Mock react‑toastify.
vi.mock('react-toastify', () => ({
  toast: vi.fn(),
  ToastContainer: () => <div data-testid="toast-container" />,
  Bounce: vi.fn(),
}));

// Import toast after mocking.
import { toast } from 'react-toastify';

/* ── tests ───────────────────────────────────────────────────────────── */
describe('SubscribeNewsletter Component', () => {
  let originalLocation: Location;

  beforeEach(() => {
    vi.useFakeTimers();

    // Store the real window.location and replace it with a writable stub.
    originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' } as Location,
    });
  });

  afterEach(() => {
    vi.useRealTimers();

    // Restore the original window.location.
    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });

    vi.resetAllMocks();
  });

  test('shows toast notification and redirects on success', () => {
    render(<SubscribeNewsletter />);

    expect(vi.mocked(toast)).toHaveBeenCalledWith(
      expect.stringContaining('Redirecting to 🏠 Page...'),
      expect.objectContaining({
        position: 'top-center',
        autoClose: 6000,
        transition: expect.any(Function), // Bounce transition
      }),
    );

    // Fast‑forward the redirect timer.
    vi.advanceTimersByTime(5000);
    expect(window.location.href).toBe('/');
  });
});
