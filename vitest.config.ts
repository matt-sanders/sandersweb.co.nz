import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: 'tests',
        replacement: resolve(__dirname, './tests'),
      },
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
  },
})
