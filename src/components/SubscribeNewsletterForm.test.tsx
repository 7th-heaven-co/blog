import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SubscribeNewsletterForm from './SubscribeNewsletterForm';
import '@testing-library/jest-dom';

// Mock fetch API globally using Vitest
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('SubscribeNewsletterForm Component', () => {
  const mockSetStatus = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  test('renders all input fields', () => {
    render(<SubscribeNewsletterForm status="" setStatus={mockSetStatus} />);
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
  });

  test('shows validation error on invalid email', async () => {
    render(<SubscribeNewsletterForm status="" setStatus={mockSetStatus} />);
    
    const emailInput = screen.getByLabelText(/Email:/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    fireEvent.submit(screen.getByRole('form') || screen.getByText(/Submit/i));

    await waitFor(() =>
      expect(screen.getByText(/Validation error/i)).toBeInTheDocument()
    );
    expect(mockSetStatus).toHaveBeenCalledWith("error");
  });

  test('submits form and updates status on successful subscription', async () => {
    (global.fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => ({}),
    });

    render(<SubscribeNewsletterForm status="" setStatus={mockSetStatus} />);
    
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.submit(screen.getByRole('form') || screen.getByText(/Submit/i));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(mockSetStatus).toHaveBeenCalled();
  });
});
