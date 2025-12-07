import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/hopeforcommunities/', // Matches your repo name exactly
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true, // Clears the folder before rebuilding
  }
})