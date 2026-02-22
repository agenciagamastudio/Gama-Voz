import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // or 'node' if testing node-specific code
  },
  server: {
    host: true, // Adiciona esta linha para expor o servidor na rede
    port: 5174,
  },
})
