import { defineConfig } from 'vite';
import { resolve } from 'path';
import compress from 'vite-plugin-compress';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
	root,
	publicDir: resolve(root, 'public'),
  build: {
		outDir,
		emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        threejs: resolve(root, 'threejs.html'),
      },
    },
  },
  plugins: [
    compress(),
  ],
});