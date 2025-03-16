import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import SubscribeNewsletter from './SubscribeNewsletter';

// ---
// First, mock the dependent modules BEFORE importing them.
// Mock the SubscribeNewsletterForm component to simulate success.
vi.mock('../components/SubscribeNewsletterForm.tsx', () => ({
  default: (props: { setStatus: (status: string) => void }) => {
    React.useEffect(() => {
      // Immediately simulate successful subscription.
      props.setStatus('success');
    }, []);
    return <div data-testid="fake-form" />;
  },
}));

// Mock react-toastify module.
vi.mock('react-toastify', () => ({
  toast: vi.fn(),
  ToastContainer: () => <div data-testid="toast-container" />,
  Bounce: vi.fn(),
}));

// Now import toast from react-toastify AFTER the module is mocked.
import { toast } from 'react-toastify';

describe('SubscribeNewsletter Component', () => {
  let originalLocation: Location;

  beforeEach(() => {
    vi.useFakeTimers();
    // Override window.location for testing redirection.
    originalLocation = window.location;
    // Delete window.location so we can replace it.
    delete (window as any).location;
    window.location = { href: '' } as Location;
  });

  afterEach(() => {
    vi.useRealTimers();
    window.location = originalLocation;
    vi.resetAllMocks();
  });

  test('shows toast notification and redirects on success', async () => {
    render(<SubscribeNewsletter />);

    // Instead of directly using toast, use vi.mocked to ensure it's recognized as a spy.
    expect(vi.mocked(toast)).toHaveBeenCalledWith(
      expect.stringContaining('Redirecting to 🏠 Page...'),
      expect.objectContaining({
        position: 'top-center',
        autoClose: 6000,
        transition: expect.any(Function), // Bounce transition function
      })
    );

    // Advance timers to simulate the delay for redirection.
    vi.advanceTimersByTime(5000);
    expect(window.location.href).toBe('/');
  });
});
