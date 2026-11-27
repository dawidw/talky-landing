import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = path.resolve(import.meta.dirname, '..')

export default defineConfig({
  plugins: [react()],
  root: import.meta.dirname,
  build: {
    outDir: path.resolve(root, 'assets/talky-demo'),
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(import.meta.dirname, 'src/main.tsx'),
      output: {
        format: 'iife',
        name: 'TalkyStageshow',
        entryFileNames: 'talky-demo.js',
        assetFileNames: 'talky-demo.[ext]',
        inlineDynamicImports: true,
      },
    },
  },
  resolve: {
    alias: {
      '@kit': path.resolve(root, '.agents/skills/stageshow/kit'),
    },
    dedupe: ['react', 'react-dom'],
  },
})