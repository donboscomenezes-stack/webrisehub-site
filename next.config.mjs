/** @type {import('next').NextConfig} */
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();

const normalizedBasePath = rawBasePath
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