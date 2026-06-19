import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@idira/design-system': path.resolve(__dirname, './packages/design-system/src/index.ts'),
      '@idira/design-system/theme': path.resolve(__dirname, './packages/design-system/src/theme/index.ts'),
      '@idira/design-system/icons': path.resolve(__dirname, './packages/design-system/src/icons/index.ts'),
      '@idira/design-system/types': path.resolve(__dirname, './packages/design-system/src/types/index.ts'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          path.resolve(__dirname, './packages/design-system/src/theme/styles'),
        ],
      },
    },
  },
})
