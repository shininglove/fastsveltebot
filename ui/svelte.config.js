import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        typescript: { tsconfigFile: './tsconfig.json' },
    }),
    kit: {
        adapter: adapter({out: 'build'}),
    },
}
export default config