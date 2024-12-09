import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    threads: false, // Ensures tests run in a single thread
    globals: true,  // Enables global test functions
  },
});
