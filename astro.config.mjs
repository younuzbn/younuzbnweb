import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

export default defineConfig({
  site: "https://younuzbn.dev",
  base: "/",
  output: "static",
  compressHTML: true,
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      customPages: ["https://younuzbn.dev/", "https://younuzbn.dev/projects/", "https://younuzbn.dev/about/"],
    }),
    robotsTxt({
      policy: [
        { userAgent: "*", allow: "/" },
        { userAgent: "Googlebot", allow: "/" },
        { userAgent: "Bingbot", allow: "/" },
      ],
      sitemap: "https://younuzbn.dev/sitemap-index.xml",
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      headers: securityHeaders,
    },
    preview: {
      headers: securityHeaders,
    },
  }
});
