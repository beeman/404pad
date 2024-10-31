import { renderToString } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    
    // Serve static files from public directory
    if (url.pathname.startsWith('/public/')) {
      const file = Bun.file('./public' + url.pathname.substring(7));
      return new Response(file);
    }

    try {
      const html = await renderToString(
        <Root />,
        {
          manifest,
          containerAttributes: {
            lang: 'en-us',
            'data-theme': 'dark',
          },
        }
      );

      return new Response(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404pad - MPL404 Native Mint Launchpad</title>
            <link rel="stylesheet" href="/public/styles.css">
            <link rel="icon" type="image/svg+xml" href="/public/favicon.svg">
            <script type="module" src="/public/entry.client.js" defer></script>
          </head>
          <body>
            ${html}
          </body>
        </html>`,
        {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    } catch (error) {
      console.error('Render error:', error);
      return new Response('Server Error', { status: 500 });
    }
  },
});

console.log(`🦊 404pad running at http://localhost:${server.port}`);