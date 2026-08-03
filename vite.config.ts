import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  tanstackStart: { prerender: { enabled: true, crawlLinks: true }, pages: [{ path: "/" }] },
  nitro: false,
});
