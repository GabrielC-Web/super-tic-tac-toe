import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte({ preprocess: [] }), tailwind()],
  site: 'https://gabrielc-web.github.io',
  base: '/super-tic-tac-toe',
});