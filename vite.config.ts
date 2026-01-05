/** node modules */
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

/** configuration */
export default defineConfig({
  plugins: [
    /** react plugins */
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),

    /** pwa setup */
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'My React App',
        short_name: 'ReactApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],

  /** path resolved */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
