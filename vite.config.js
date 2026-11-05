import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';

/**
 * Plugin de développement local pour exécuter les fonctions Vercel (/api/*) directement dans Vite
 */
function vercelApiDevPlugin() {
  return {
    name: 'vercel-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/api/devis' || url === '/api/quote' || url === '/api/contact') {
          if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.statusCode = 200;
            res.end();
            return;
          }

          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              let parsedBody = {};
              if (body) {
                try {
                  parsedBody = JSON.parse(body);
                } catch {
                  parsedBody = body;
                }
              }

              const modulePath = url === '/api/contact' ? '/api/contact.ts' : '/api/devis.ts';
              const apiModule = await server.ssrLoadModule(modulePath);
              const handler = apiModule.default;

              const vercelReq = {
                method: req.method,
                headers: req.headers,
                body: parsedBody,
                url: req.url,
              };

              const vercelRes = {
                status(code) {
                  res.statusCode = code;
                  return vercelRes;
                },
                setHeader(name, value) {
                  res.setHeader(name, value);
                  return vercelRes;
                },
                json(data) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return vercelRes;
                },
              };

              await handler(vercelReq, vercelRes);
            } catch (err) {
              console.error('[Vite Local API Error]:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Internal Server Error' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiDevPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');
          if (normalized.includes('/node_modules/')) {
            if (
              normalized.includes('/react/') ||
              normalized.includes('/react-dom/') ||
              normalized.includes('/scheduler/')
            ) {
              return 'vendor-react';
            }
            if (normalized.includes('/framer-motion/')) {
              return 'vendor-framer';
            }
            if (normalized.includes('/lucide-react/')) {
              return 'vendor-icons';
            }
            if (normalized.includes('/i18next') || normalized.includes('/react-i18next/')) {
              return 'vendor-i18n';
            }
            if (normalized.includes('/zod/')) {
              return 'vendor-zod';
            }
            return 'vendor-libs';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
