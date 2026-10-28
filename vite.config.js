import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // relative paths so the build can be hosted from any folder
  // Built into docs/ because GitHub Pages can only serve the repo root or a folder named docs.
  build: { outDir: 'docs', chunkSizeWarningLimit: 2000 }, // Phaser alone is ~1.4 MB minified
});
