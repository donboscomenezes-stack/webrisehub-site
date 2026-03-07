/** @type {import('next').NextConfig} */
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();

// Only apply basePath/assetPrefix for production export builds.
// In dev, a configured basePath often causes asset 404s when you visit `/`.
const useBasePath = process.env.NODE_ENV === "production" && rawBasePath.length > 0;

const normalizedBasePath = useBasePath
  ? `/${rawBasePath}`
      .replace(/\/{2,}/g, "/")
      .replace(/\/$/, "")
  : "";

const basePath = normalizedBasePath === "/" ? "" : normalizedBasePath;

const nextConfig = {
  output: "export", // static export for Cloudflare Pages
  ...(basePath ? { basePath, assetPrefix: basePath } : {})
};

export default nextConfig;