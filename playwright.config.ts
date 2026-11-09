import { defineConfig, devices } from '@playwright/test';

/**
 * Runs against `next dev` and the local fch-api (http://127.0.0.1:8000, as in
 * .env.local). Nothing reaches Google or the database: see e2e/support/apply.ts.
 */
const PORT = 3100;

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 120_000,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: `npx next dev -p ${PORT}`,
    url: `http://localhost:${PORT}/apply`,
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
