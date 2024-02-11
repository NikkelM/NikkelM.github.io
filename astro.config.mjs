import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://nikkelm.dev',
	output: 'static',
	publicDir: './src/public',
	build: {
    format: 'preserve'
  }
});
