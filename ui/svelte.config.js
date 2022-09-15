import node from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        postcss: true,
    }),
	kit: {
		adapter: node(),
        vite: {
            resolve: {
                alias: {
                    '$src': path.resolve('./src')
                }
            },
        }
	}
};

export default config;
