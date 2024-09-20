import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://importacionesjjstore.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
