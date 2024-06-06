import preprocess from 'svelte-preprocess';
import cloudflare from '@sveltejs/adapter-cloudflare';

export default {
  preprocess: preprocess(),
  kit: {
    adapter: cloudflare(),
    target: '#svelte'  // Ensure this matches your target in `src/app.html`
  }
};