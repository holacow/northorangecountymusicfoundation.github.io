import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const port = Number(process.env.PORT ?? 5173);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

function getBasePath(): string {
  const explicitBasePath = process.env.BASE_PATH;

  if (explicitBasePath) {
    if (explicitBasePath === "/") return "/";
    const withLeadingSlash = explicitBasePath.startsWith("/")
      ? explicitBasePath
      : `/${explicitBasePath}`;
    return withLeadingSlash.endsWith("/")
      ? withLeadingSlash
      : `${withLeadingSlash}/`;
  }

  const [repositoryOwner, repositoryName] =
    process.env.GITHUB_REPOSITORY?.split("/") ?? [];

  if (
    process.env.GITHUB_ACTIONS === "true" &&
    repositoryOwner &&
    repositoryName
  ) {
    const userSiteRepository = `${repositoryOwner}.github.io`;

    return repositoryName.toLowerCase() === userSiteRepository.toLowerCase()
      ? "/"
      : `/${repositoryName}/`;
  }

  return "/";
}

const basePath = getBasePath();
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    ...(!isProduction ? [runtimeErrorOverlay()] : []),
    ...(!isProduction && process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
