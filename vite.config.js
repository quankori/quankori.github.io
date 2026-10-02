import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  // three.js alone is ~600 kB; one chunk is fine for a single-page experience
  build: { chunkSizeWarningLimit: 900 },
})
