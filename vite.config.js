import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// App is exposed externally as  http://HOST/aiux/  via nginx, which uses
//   `proxy_pass http://127.0.0.1:27777/;`  (trailing slash strips /aiux/
//   before forwarding to the dev server).
//
// To make a single vite instance serve correctly in BOTH cases below
// without changes to nginx, we:
//   1) set `base: '/aiux/'` so the served HTML emits asset URLs prefixed
//      with /aiux/ — guaranteed to resolve through nginx;
//   2) add a small middleware that re-attaches the /aiux/ prefix to any
//      incoming request that lost it (i.e. the nginx-stripped requests),
//      and to direct-access requests that don't have the prefix yet.
//      Browsers loading the page will end up requesting /aiux/* either
//      way, and the middleware ensures the dev server always receives a
//      prefixed URL — preventing vite's built-in / → /aiux/ redirect that
//      would otherwise change the address bar on direct access.
//
// Result:
//   Direct dev:   browser visits  http://localhost:27777/        → works
//   nginx proxy:  browser visits  http://host/aiux/              → works
//   The address bar stays as the user typed it.
const BASE = '/aiux/'
const PREFIX = '/aiux'  // BASE without the trailing slash

const HMR_CLIENT_PORT = process.env.VITE_HMR_CLIENT_PORT
  ? Number(process.env.VITE_HMR_CLIENT_PORT)
  : undefined

function restorePrefixPlugin() {
  return {
    name: 'aiux-restore-prefix',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url
        if (!url) return next()
        // Already prefixed — nothing to do.
        if (url === PREFIX || url.startsWith(PREFIX + '/') || url.startsWith(PREFIX + '?')) {
          return next()
        }
        // Don't rewrite favicon — let it 404 cleanly if absent.
        if (url === '/favicon.ico') return next()
        // Rewrite "/" or "/foo" → "/aiux" or "/aiux/foo".
        req.url = url === '/' ? PREFIX + '/' : PREFIX + url
        next()
      })
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [vue(), restorePrefixPlugin()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
  },
  server: {
    host: '0.0.0.0',
    port: 27777,
    strictPort: true,
    allowedHosts: true,
    // HMR through nginx: set VITE_HMR_CLIENT_PORT=80 (or 443 for https) so
    // the browser's WebSocket targets the public port. Default lets vite
    // pick the page port automatically (works for direct access).
    hmr: HMR_CLIENT_PORT ? { clientPort: HMR_CLIENT_PORT } : true,
  },
  preview: {
    host: '0.0.0.0',
    port: 27777,
    strictPort: true,
    allowedHosts: true,
  },
})
