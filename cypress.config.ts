import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/e2e/specs/**/*.ts',
    supportFile: 'tests/e2e/support/index.ts',
    fixturesFolder: 'tests/e2e/fixtures',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
