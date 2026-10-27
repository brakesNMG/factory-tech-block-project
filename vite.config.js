import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // relative paths so the build can be hosted from any folder
  build: { chunkSizeWarningLimit: 2000 }, // Phaser alone is ~1.4 MB minified
});
