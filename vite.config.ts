// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// STATIC_BUILD=true (used by the GitHub Pages workflow) prerenders the site
// into plain HTML instead of the default Cloudflare server build.
const isStaticBuild = process.env["STATIC_BUILD"] === "true";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isStaticBuild
      ? { prerender: { enabled: true, crawlLinks: true }, pages: [{ path: "/" }] }
      : {}),
  },
  ...(isStaticBuild ? { nitro: { preset: "static" as const } } : {}),
});

