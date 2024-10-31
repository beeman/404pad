import { defineConfig } from 'astro/config';
import qwik from "@qwikdev/astro";
import netlify from "@astrojs/netlify";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [
    qwik({
      routesDir: './src/routes',
      buildOutput: {
        clientOutput: {
          path: 'dist/client'
        },
        serverOutput: {
          path: 'dist/server'
        }
      }
    }), 
    tailwind()
  ],
  output: 'server',
  adapter: netlify(),
});