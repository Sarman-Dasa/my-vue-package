// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.js',
      name: 'MyVuePackage',
      fileName: (format) => `my-vue-package.${format}.js`,
      formats: ['es', 'umd']
    },
  }
});

