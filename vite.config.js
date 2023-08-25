import { defineConfig } from 'vite';
import { resolve } from 'path';

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
				404: resolve(root, '404.html'),
			},
		},
		assetsInlineLimit: 0,
	},
});