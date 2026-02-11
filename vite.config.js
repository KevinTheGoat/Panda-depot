import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Use '/' for custom domain, or '/Panda-depot/' for GitHub Pages subdomain
  server: {
    port: 3000,
    open: true
  }
})
