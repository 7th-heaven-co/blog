import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SubscribeNewsletterForm from './SubscribeNewsletterForm';
import '@testing-library/jest-dom';

// Mock fetch API globally using Vitest
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

describe('SubscribeNewsletterForm Component', () => {
  const mockSetStatus = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  test('renders all input fields and checkboxes', () => {
    const { container } = render(<SubscribeNewsletterForm status="" setStatus={mockSetStatus} />);

    // Verify text inputs render
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();

    // Query checkboxes using container.querySelector by their name attribute.
    const allCheckbox = container.querySelector('input[name="all"]');
    const heavenCheckbox = container.querySelector('input[name="heaven"]');
    const announcementsCheckbox = container.querySelector('input[name="announcements"]');
    const communityCheckbox = container.querySelector('input[name="community"]');
    const authorCheckbox = container.querySelector('input[name="author"]');
    const eventsCheckbox = container.querySelector('input[name="events"]');
    const releasesCheckbox = container.querySelector('input[name="releases"]');

    expect(allCheckbox).toBeInTheDocument();
    expect(heavenCheckbox).toBeInTheDocument();
    expect(announcementsCheckbox).toBeInTheDocument();
    expect(communityCheckbox).toBeInTheDocument();
    expect(authorCheckbox).toBeInTheDocument();
    expect(eventsCheckbox).toBeInTheDocument();
    expect(releasesCheckbox).toBeInTheDocument();
  });

  test('toggles all individual checkboxes when All checkbox is clicked', () => {
    const { container } = render(<SubscribeNewsletterForm status="" setStatus={mockSetStatus} />);

    // Get checkboxes by querying the DOM by their name attribute.
    const allCheckbox = container.querySelector('input[name="all"]');
    const heavenCheckbox = container.querySelector('input[name="heaven"]');
    const announcementsCheckbox = container.querySelector('input[name="announcements"]');
    const communityCheckbox = container.querySelector('input[name="community"]');
    const authorCheckbox = container.querySelector('input[name="author"]');
    const eventsCheckbox = container.querySelector('input[name="events"]');
    const releasesCheckbox = container.querySelector('input[name="releases"]');

    // Ensure all checkboxes are initially unchecked.
    expect(allCheckbox).not.toBeChecked();
    expect(heavenCheckbox).not.toBeChecked();
    expect(announcementsCheckbox).not.toBeChecked();
    expect(communityCheckbox).not.toBeChecked();
    expect(authorCheckbox).not.toBeChecked();
    expect(eventsCheckbox).not.toBeChecked();
    expect(releasesCheckbox).not.toBeChecked();

    // Simulate clicking the "All" checkbox.
    fireEvent.click(allCheckbox);

    // After clicking, all checkboxes should be checked.
    expect(allCheckbox).toBeChecked();
    expect(heavenCheckbox).toBeChecked();
    expect(announcementsCheckbox).toBeChecked();
    expect(communityCheckbox).toBeChecked();
    expect(authorCheckbox).toBeChecked();
    expect(eventsCheckbox).toBeChecked();
    expect(releasesCheckbox).toBeChecked();
  });

  test('shows validation error on invalid email', async () => {
    const { container } = render(<SubscribeNewsletterForm status="" setStatus={mockSetStatus} />);

    // Change email to an invalid value.
    const emailInput = screen.getByLabelText(/Email:/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    // Submit the form.
    fireEvent.submit(screen.getByRole('form') || screen.getByText(/Submit/i));

    // Wait for validation error message to appear.
    await waitFor(() => expect(screen.getByText(/Validation error/i)).toBeInTheDocument());
    expect(mockSetStatus).toHaveBeenCalledWith('error');
  });

  test('submits form and updates status on successful subscription', async () => {
    (global.fetch as vi.Mock).mockResolvedValueOnce({
      json: async () => ({}),
    });

    const { container } = render(<SubscribeNewsletterForm status="" setStatus={mockSetStatus} />);

    // Provide valid email input.
    const emailInput = screen.getByLabelText(/Email:/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Click the "All" checkbox to select all newsletter preferences.
    const allCheckbox = container.querySelector('input[name="all"]');
    fireEvent.click(allCheckbox);

    // Submit the form.
    fireEvent.submit(screen.getByRole('form') || screen.getByText(/Submit/i));

    // Wait for the API call to be triggered.
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(mockSetStatus).toHaveBeenCalled();
  });
});
