import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        postcss: true,
    }),
	kit: {
		adapter: adapter(),
        vite: {
            resolve: {
                alias: {
                    $root: path.resolve('./src')
                }
            },
            server: {
                proxy: {
                    '/api': 'http://localhost:8000',
                }
            } 
        }
	}
};

export default config;
