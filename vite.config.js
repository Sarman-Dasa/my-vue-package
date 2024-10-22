import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'), // Ensure the entry path is resolved
      name: 'MyVuePackage',
      fileName: (format) => `my-vue-package.${format}.js`,
      formats: ['es', 'umd'], // ES module and UMD formats
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled with your library
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue', // Provide a global variable for Vue when using UMD
        },
      },
    },
  },
});
