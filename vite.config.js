import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
        short_name: 'LoveLtr',
        name: 'LoveLtr',
        description: 'Love Letter card counter',
        icons: [
          {
            src: './favicon.png',
            type: 'image/png',
            sizes: '105x105'
          }
        ],
        start_url: './',
        scope: './',
        background_color: '#ffffff',
        theme_color: '#db9714',
        display: 'standalone',
      }
    }),
  ],
})
