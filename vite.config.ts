import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    minify: "terser"
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    // basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      devOptions: {
        enabled: true,
        type: 'module',
      },

      manifest: {
        name: 'DLL Attendance Monitoring',
        short_name: 'DLL VeriScan',
        description: 'An attendance monitoring system',

        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/pwa',
        scope: '/',

        icons: [
          {
            src: 'logo-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'logo-128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'logo-256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
      }
    })
  ],
  // server: {
  //   https: true,
  //   host: true
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
