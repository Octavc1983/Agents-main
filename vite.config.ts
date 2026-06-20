import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Sub-path aliases MUST come before the bare package alias (Vite matches first-wins)
      { find: '@idira/design-system/theme', replacement: path.resolve(__dirname, './packages/design-system/src/theme/index.ts') },
      { find: '@idira/design-system/icons', replacement: path.resolve(__dirname, './packages/design-system/src/icons/index.ts') },
      { find: '@idira/design-system/types', replacement: path.resolve(__dirname, './packages/design-system/src/types/index.ts') },
      { find: '@idira/design-system/styles', replacement: path.resolve(__dirname, './packages/design-system/src/theme/styles/index.scss') },
      { find: '@idira/design-system', replacement: path.resolve(__dirname, './packages/design-system/src/index.ts') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
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
