# Testing

This project uses a combination of unit, integration, and end-to-end tests to ensure code quality and functionality. The following sections describe how to run tests, the tools used, and guidelines for adding new tests.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

## Tools & Frameworks

- **Vitest** – for unit and integration testing.
- **React Testing Library** – for testing React components.
- **Jest-DOM** – for additional DOM matchers.
- **Playwright** – for end-to-end (E2E) testing.
- **Astro Testing Guide** – refer to [Astro's official testing documentation](https://docs.astro.build/en/guides/testing/) for additional configuration details.

## Running Unit & Integration Tests

### Run the tests

```bash
npm run test
```

This command runs all tests using Vitest

### You can also run tests in watch mode

```bash
npm run test:watch
```

## Test Structure

- Unit tests for React components (e.g., SubscribeNewsletterForm.tsx and SubscribeNewsletter.tsx) should be located in files with a .test.tsx extension.
- Integration tests for Astro pages (e.g., newsletter.astro) can be placed alongside the page components or within a dedicated test folder.

## Running End-to-End Tests with Playwright

### Install Playwright (if not already installed)

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Configure Playwright

Create or update the Playwright configuration file (e.g., playwright.config.ts) as needed. An example configuration is:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  use: {
    headless: true,
    baseURL: 'http://localhost:3000', // adjust to your local dev server URL
  },
});
```

### Running the E2E Tests

- Place your Playwright tests in the tests/e2e folder.
- Run the tests using:

```bash
npx playwright test
```

### A sample test file (newsletter.spec.ts) might look like this

```typescript
import { test, expect } from '@playwright/test';

test('newsletter subscription flow', async ({ page }) => {
  // Visit the newsletter page
  await page.goto('/newsletter');

  // Fill out the email input field (adjust selector if necessary)
  await page.fill('input[name="email"]', 'user@example.com');

  // Optionally fill out other fields
  // await page.fill('input[name="first_name"]', 'John');
  // await page.fill('input[name="last_name"]', 'Doe');

  // Submit the form
  await page.click('button:has-text("Submit")');

  // Verify that the success message or toast appears
  await expect(page.locator('text=Successfully subscribed!')).toBeVisible();

  // Wait for redirection (adjust wait time if needed)
  await page.waitForTimeout(2100);
  await expect(page).toHaveURL('/');
});
```

## Writing New Tests

- **Component Tests:** Use React Testing Library to simulate user interactions and validate component behavior (e.g., input sanitization, form submission, and UI feedback).
- **Snapshot Testing:** Consider using snapshots for Astro pages to ensure that the layout and client-side components render as expected.
- **E2E Tests:** Use Playwright for full user flow tests to cover interactions that span multiple components or pages.

## Additional Guidelines

- Follow best practices as described in the Astro Testing Guide.
- When testing isolated components, mock network requests (e.g., using Jest mocks for fetch).
- Ensure tests are integrated into your continuous integration (CI) process to catch regressions early.
