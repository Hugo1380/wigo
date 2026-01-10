import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-favicon',
      closeBundle() {
        try {
          const faviconPath = resolve(__dirname, 'favicon.ico')
          const distDir = resolve(__dirname, '../../public')
          const distPath = resolve(distDir, 'favicon.ico')
          if (existsSync(faviconPath)) {
            if (!existsSync(distDir)) {
              mkdirSync(distDir, { recursive: true })
            }
            copyFileSync(faviconPath, distPath)
          }
        } catch (err) {
          console.warn('Could not copy favicon.ico:', err.message)
        }
      }
    }
  ],
  base: '/',
  build: {
    outDir: '../../public',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
